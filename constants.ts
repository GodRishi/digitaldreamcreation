import { VideoItem, Testimonial, AlbumItem } from './types';

export const PORTFOLIO_ITEMS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Rohan & Priya | The Royal Union',
    category: 'wedding',
    thumbnailUrl: 'https://picsum.photos/1920/1080?random=1',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '04:23',
    description: 'A grand celebration of love at the Oberoi Udaivilas.',
  },
  {
    id: 'v2',
    title: 'Amit & Sanya | Cinematic Teaser',
    category: 'wedding',
    thumbnailUrl: 'https://picsum.photos/1920/1080?random=2',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '01:15',
    description: 'High energy cinematic teaser showcasing the Haldi and Sangeet.',
  },
  {
    id: 'v3',
    title: 'Vibrant Haldi Moments',
    category: 'reel',
    thumbnailUrl: 'https://picsum.photos/1080/1920?random=3',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '00:45',
    description: 'Vertical reel edit for Instagram.',
  },
  {
    id: 'v4',
    title: 'Aarav\'s 5th Birthday',
    category: 'event',
    thumbnailUrl: 'https://picsum.photos/1920/1080?random=4',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '03:00',
    description: 'A magical superhero themed birthday bash.',
  },
  {
    id: 'v5',
    title: 'Rice Ceremony of Vihaan',
    category: 'event',
    thumbnailUrl: 'https://picsum.photos/1920/1080?random=5',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '05:12',
    description: 'Traditional Bengali Annaprasan captured with warmth.',
  },
  {
    id: 'v6',
    title: 'Love in the Hills | Pre-Wedding',
    category: 'wedding',
    thumbnailUrl: 'https://picsum.photos/1920/1080?random=6',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '03:45',
    description: 'A romantic pre-wedding shoot in Darjeeling.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sneha Roy',
    role: 'Bride',
    content: "Digital Dream Creation made our wedding look like a movie. The editing was crisp, emotional, and simply perfect.",
    rating: 5,
  },
  {
    id: 't2',
    name: 'Rajesh Gupta',
    role: 'Father of the Groom',
    content: "Very professional team. They captured every small detail of the ceremony. The editing quality is world-class.",
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya & Ankit',
    role: 'Couple',
    content: "We watched our wedding film 10 times in a row! Thank you Rishav for the amazing work.",
    rating: 5,
  },
];

export const ALBUMS: AlbumItem[] = [
  {
    id: 'a1',
    title: 'The Royal Union',
    clientNames: 'Rohan & Priya',
    coverUrl: 'https://picsum.photos/800/1000?random=10',
    year: '2023',
  },
  {
    id: 'a2',
    title: 'Mountain Whisper',
    clientNames: 'Amit & Sanya',
    coverUrl: 'https://picsum.photos/800/1000?random=11',
    year: '2023',
  },
  {
    id: 'a3',
    title: 'Golden Hour',
    clientNames: 'Vikram & Aditi',
    coverUrl: 'https://picsum.photos/800/1000?random=12',
    year: '2022',
  },
];