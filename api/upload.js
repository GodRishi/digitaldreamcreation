import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { isSessionValid } from './_lib/adminAuth.js';
import { updateVideoSlot } from './_lib/videoStore.js';
import { ensureResHelpers } from './_lib/resPolyfill.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_VIDEO_SIZE = 150 * 1024 * 1024; // 150MB cap
const MAX_THUMBNAIL_SIZE = 15 * 1024 * 1024; // 15MB cap

const ALLOWED_VIDEO_EXT = ['.mp4', '.webm', '.mov'];
const ALLOWED_IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

export default async function handler(req, res) {
  ensureResHelpers(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Server-Side Session Verification
  if (!isSessionValid(req)) {
    return res.status(401).json({ error: 'Unauthorized. Session expired or invalid.' });
  }

  try {
    const slotKey = req.headers['x-slot-key'] || req.query?.slotKey;
    const targetType = req.headers['x-target-type'] || req.query?.targetType || 'video'; // 'video' or 'thumbnail'
    const filenameHeader = req.headers['x-filename'] || (targetType === 'thumbnail' ? 'cover.jpg' : 'video.mp4');
    
    if (!slotKey) {
      return res.status(400).json({ error: 'Missing required slotKey.' });
    }

    const ext = path.extname(filenameHeader).toLowerCase();

    if (targetType === 'thumbnail') {
      if (!ALLOWED_IMAGE_EXT.includes(ext)) {
        return res.status(400).json({
          error: `Invalid thumbnail image format (${ext || 'unknown'}). Only .jpg, .jpeg, .png, and .webp images are accepted.`
        });
      }
    } else {
      if (!ALLOWED_VIDEO_EXT.includes(ext)) {
        return res.status(400).json({
          error: `Invalid video format (${ext || 'unknown'}). Only .mp4, .webm, and .mov video files are accepted.`
        });
      }
    }

    const maxSizeCap = targetType === 'thumbnail' ? MAX_THUMBNAIL_SIZE : MAX_VIDEO_SIZE;

    let fileBuffer;

    if (Buffer.isBuffer(req.body)) {
      fileBuffer = req.body;
    } else if (typeof req.body === 'string') {
      fileBuffer = Buffer.from(req.body, 'binary');
    } else {
      const chunks = [];
      let totalSize = 0;

      for await (const chunk of req) {
        totalSize += chunk.length;
        if (totalSize > maxSizeCap) {
          return res.status(400).json({
            error: `File size exceeds limit (${(maxSizeCap / (1024 * 1024)).toFixed(0)}MB cap).`
          });
        }
        chunks.push(chunk);
      }
      fileBuffer = Buffer.concat(chunks);
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return res.status(400).json({ error: 'Empty file payload received.' });
    }

    if (fileBuffer.length > maxSizeCap) {
      return res.status(400).json({
        error: `File size (${(fileBuffer.length / (1024 * 1024)).toFixed(1)}MB) exceeds limit (${(maxSizeCap / (1024 * 1024)).toFixed(0)}MB cap).`
      });
    }

    let publicUrl = '';
    const filePrefix = targetType === 'thumbnail' ? `${slotKey}-thumb` : `${slotKey}-video`;

    // 2. Storage Strategy: Vercel Blob vs Local Project Public Directory vs Temp
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blobFilename = `${filePrefix}${ext}`;
      const blob = await put(blobFilename, fileBuffer, {
        access: 'public',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      publicUrl = blob.url;
    } else {
      const localDir = path.join(process.cwd(), 'public', 'uploads');
      const tmpDir = path.join('/tmp', 'uploads');
      let targetDir = localDir;

      try {
        if (!fs.existsSync(localDir)) {
          fs.mkdirSync(localDir, { recursive: true });
        }
      } catch (e) {
        targetDir = tmpDir;
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
      }

      const localFilename = `${filePrefix}${ext}`;
      const destPath = path.join(targetDir, localFilename);
      fs.writeFileSync(destPath, fileBuffer);
      publicUrl = `/uploads/${localFilename}?t=${Date.now()}`;
    }

    // 3. Update Manifest Store & Persist Metadata
    const updatedSlot = updateVideoSlot(slotKey, publicUrl, targetType, fileBuffer.length);

    return res.status(200).json({
      success: true,
      message: `${targetType === 'thumbnail' ? 'Thumbnail cover image' : 'Video file'} updated successfully.`,
      targetType,
      slot: updatedSlot
    });

  } catch (err) {
    console.error('Error during upload:', err);
    return res.status(500).json({
      error: `Server error during upload: ${err.message || 'Unknown error.'}`
    });
  }
}
