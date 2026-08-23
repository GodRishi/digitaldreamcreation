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

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB cap
const ALLOWED_EXTENSIONS = ['.mp4', '.webm', '.mov'];

export default async function handler(req, res) {
  ensureResHelpers(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Independent Server-Side Session Cookie Verification
  if (!isSessionValid(req)) {
    return res.status(401).json({ error: 'Unauthorized. Session expired or invalid.' });
  }

  try {
    const slotKey = req.headers['x-slot-key'] || req.query.slotKey;
    const filenameHeader = req.headers['x-filename'] || 'video.mp4';
    
    if (!slotKey) {
      return res.status(400).json({ error: 'Missing required slotKey.' });
    }

    const ext = path.extname(filenameHeader).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return res.status(400).json({
        error: `Invalid file format (${ext || 'unknown'}). Only .mp4, .webm, and .mov video files are accepted.`
      });
    }

    // Read incoming raw binary buffer
    const chunks = [];
    let totalSize = 0;

    for await (const chunk of req) {
      totalSize += chunk.length;
      if (totalSize > MAX_FILE_SIZE) {
        return res.status(400).json({
          error: `File size exceeds the 150MB limit. Current file size is ${(totalSize / (1024 * 1024)).toFixed(1)}MB.`
        });
      }
      chunks.push(chunk);
    }

    const fileBuffer = Buffer.concat(chunks);

    if (fileBuffer.length === 0) {
      return res.status(400).json({ error: 'Empty file payload received.' });
    }

    let publicUrl = '';

    // 2. Vercel Blob or Local Filesystem Storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blobFilename = `${slotKey}${ext}`;
      const blob = await put(blobFilename, fileBuffer, {
        access: 'public',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      publicUrl = blob.url;
    } else {
      // Local development fallback
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const localFilename = `${slotKey}${ext}`;
      const destPath = path.join(uploadDir, localFilename);
      fs.writeFileSync(destPath, fileBuffer);
      publicUrl = `/uploads/${localFilename}?t=${Date.now()}`;
    }

    // 3. Update Manifest Store
    const updatedSlot = updateVideoSlot(slotKey, publicUrl, fileBuffer.length);

    return res.status(200).json({
      success: true,
      message: 'Video updated successfully.',
      slot: updatedSlot
    });

  } catch (err) {
    console.error('Error during video upload:', err);
    return res.status(500).json({
      error: `Server error during upload: ${err.message || 'Unknown network error.'}`
    });
  }
}
