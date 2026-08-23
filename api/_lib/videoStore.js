import fs from 'fs';
import path from 'path';

const INITIAL_VIDEO_SLOTS = [
  {
    slotKey: 'portfolio-video-1',
    label: 'Aarav & Ananya — Royal Bengali Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-2',
    label: 'Vikram & Meera — Destination Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-3',
    label: 'Rohan & Shreya — Pre-Wedding Engagement Film',
    category: 'Engagements',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-4',
    label: 'Dev & Pooja — ITC Sonar Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-5',
    label: 'Karan & Riya — Glass House Engagement Film',
    category: 'Engagements',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  },
  {
    slotKey: 'portfolio-video-6',
    label: 'Siddharth & Priya — Oberoi Grand Wedding Film',
    category: 'Weddings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    lastUpdated: 'Initial Release',
    sizeBytes: 0
  }
];

// In-memory cache + persistent file fallback
let videoManifestCache = null;

const MANIFEST_PATH = path.join(process.cwd(), 'public', 'uploads', 'manifest.json');

export function getVideoSlots() {
  if (videoManifestCache) return videoManifestCache;

  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf8');
      videoManifestCache = JSON.parse(data);
      return videoManifestCache;
    }
  } catch (err) {
    console.error('Error reading manifest file:', err);
  }

  videoManifestCache = [...INITIAL_VIDEO_SLOTS];
  return videoManifestCache;
}

export function updateVideoSlot(slotKey, newUrl, sizeBytes = 0) {
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
    slots[index].videoUrl = newUrl;
    slots[index].lastUpdated = nowStr;
    slots[index].sizeBytes = sizeBytes;
  } else {
    slots.push({
      slotKey,
      label: slotKey,
      category: 'General',
      videoUrl: newUrl,
      lastUpdated: nowStr,
      sizeBytes
    });
  }

  videoManifestCache = slots;

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(slots, null, 2));
  } catch (err) {
    console.error('Error persisting manifest file:', err);
  }

  return slots[index !== -1 ? index : slots.length - 1];
}
