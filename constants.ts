import { VideoItem, Testimonial, AlbumItem } from './types';

export const PORTFOLIO_ITEMS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Anuraj & Salorita | Engagement',
    category: 'engagement',
    thumbnailUrl: 'https://i.ibb.co/Mxr5MntC/Whats-App-Image-2026-02-20-at-11-08-22-PM.jpg',
    videoUrl: 'https://drive.google.com/file/d/1Ha3hgYidUjmvvgz0Oeqj3dbxtiuMFW1S/view?usp=drive_link',
    driveLink: 'https://drive.google.com/file/d/1Ha3hgYidUjmvvgz0Oeqj3dbxtiuMFW1S/view?usp=drive_link',
    duration: '01:00',
    description: 'A timeless union of grace and grandeur. Witness the breathtaking moments of Anuraj and Salorita’s regally inspired engagement ceremony.',
  },
  {
    id: 'v2',
    title: 'Bratati & Sanju | Wedding',
    category: 'wedding',
    thumbnailUrl: 'https://i.ibb.co/wr6xDZLm/Whats-App-Image-2026-02-21-at-8-55-02-AM.jpg',
    videoUrl: 'https://drive.google.com/file/d/1xW7K5qTq-B3E0NWjAo_mSNdTUjxGfJZT/view?usp=drive_link',
    driveLink: 'https://drive.google.com/file/d/1xW7K5qTq-B3E0NWjAo_mSNdTUjxGfJZT/view?usp=drive_link',
    duration: '02:10',
    description: 'A beautiful chaos of color and love. Experience the high-octane energy and deep-rooted traditions that defined Bratati and Sanju’s wedding journey.',
  },
  {
    id: 'v3',
    title: 'Rahul & Puja | Wedding',
    category: 'wedding',
    thumbnailUrl: 'https://i.ibb.co/xK8sV3RX/Whats-App-Image-2026-02-20-at-11-08-08-PM.jpg',
    videoUrl: 'https://drive.google.com/file/d/1nfuLyBgDbQqvPCkTCrpqLE6CvjnHvoI0/view?usp=drive_link',
    driveLink: 'https://drive.google.com/file/d/1nfuLyBgDbQqvPCkTCrpqLE6CvjnHvoI0/view?usp=drive_link',
    duration: '01:02',
    description: 'Two souls, one beautiful journey. Rahul and Puja’s wedding was a masterclass in elegance, featuring moments that felt like they were pulled straight from a dream.',
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
    title: "Sreya's Wedding",
    clientNames: 'Sreya & Sayantan',
    coverUrl: 'https://i.ibb.co/cKNDv0zm/Digital-Dream-Creation-01.jpg',
    driveLink: 'https://drive.google.com/file/d/1mR6rCcH6SaFFCF3OW9cKzt6zPCTn2Bx3/view?usp=drive_link',
    year: '2023',
  },
  {
    id: 'a2',
    title: 'Love United',
    clientNames: 'Amartya & Moumi',
    coverUrl: 'https://i.ibb.co/1HVKQLc/Digital-Dream-Creation-04.jpg',
    driveLink: 'https://drive.google.com/file/d/1J5QaADAz2lKJxL-zNKH1xlcO1P1EL5AO/view?usp=sharing',
    year: '2023',
  },
];