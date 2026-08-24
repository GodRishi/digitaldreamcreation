import fs from 'fs';
import path from 'path';

const INITIAL_VIDEO_SLOTS = [
  {
    slotKey: 'portfolio-video-1',
    label: 'Aarav & Ananya — Royal Bengali Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-2',
    label: 'Vikram & Meera — Destination Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-3',
    label: 'Rohan & Shreya — Pre-Wedding Engagement Film',
    category: 'Engagements',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-4',
    label: 'Dev & Pooja — ITC Sonar Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-5',
    label: 'Karan & Riya — Glass House Engagement Film',
    category: 'Engagements',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-6',
    label: 'Siddharth & Priya — Oberoi Grand Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  }
];

let videoManifestCache = null;

const LOCAL_MANIFEST = path.join(process.cwd(), 'public', 'uploads', 'manifest.json');
const TMP_MANIFEST = path.join('/tmp', 'manifest.json');

export function getVideoSlots() {
  if (videoManifestCache) return videoManifestCache;

  // Try reading from /tmp first (Vercel runtime)
  try {
    if (fs.existsSync(TMP_MANIFEST)) {
      const data = fs.readFileSync(TMP_MANIFEST, 'utf8');
      videoManifestCache = JSON.parse(data);
      return videoManifestCache;
    }
  } catch (e) {
    // Ignore
  }

  // Try reading from local public/uploads/manifest.json
  try {
    if (fs.existsSync(LOCAL_MANIFEST)) {
      const data = fs.readFileSync(LOCAL_MANIFEST, 'utf8');
      videoManifestCache = JSON.parse(data);
      return videoManifestCache;
    }
  } catch (e) {
    // Ignore
  }

  videoManifestCache = [...INITIAL_VIDEO_SLOTS];
  return videoManifestCache;
}

export function updateVideoSlot(slotKey, newUrl, targetType = 'video', sizeBytes = 0) {
  const slots = getVideoSlots();
  const index = slots.findIndex(s => s.slotKey === slotKey);
  
  const nowStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (index !== -1) {
    if (targetType === 'thumbnail') {
      slots[index].thumbnailUrl = newUrl;
    } else {
      slots[index].videoUrl = newUrl;
    }
    slots[index].lastUpdated = nowStr;
    if (sizeBytes > 0) slots[index].sizeBytes = sizeBytes;
  } else {
    slots.push({
      slotKey,
      label: slotKey,
      category: 'General',
      videoUrl: targetType === 'video' ? newUrl : 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumbnailUrl: targetType === 'thumbnail' ? newUrl : '',
      lastUpdated: nowStr,
      sizeBytes
    });
  }

  videoManifestCache = slots;

  // Save to /tmp for Vercel Serverless Function runtime
  try {
    fs.writeFileSync(TMP_MANIFEST, JSON.stringify(slots, null, 2));
  } catch (err) {
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_MANIFEST, JSON.stringify(slots, null, 2));
    } catch (e) {
      // Memory fallback if filesystem is read-only
    }
  }

  return slots[index !== -1 ? index : slots.length - 1];
}
