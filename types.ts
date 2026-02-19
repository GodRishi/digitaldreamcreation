export interface VideoItem {
  id: string;
  title: string;
  category: 'wedding' | 'reel' | 'event';
  thumbnailUrl: string;
  videoUrl?: string; // For simulation, we might use placeholder or generic embeds
  duration?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Bride" or "Event Organizer"
  content: string;
  rating: number;
}

export interface AlbumItem {
  id: string;
  title: string;
  clientNames: string;
  coverUrl: string;
  year: string;
}

export enum NavLink {
  HOME = '/',
  PORTFOLIO = '/portfolio',
  ALBUMS = '/albums',
  ABOUT = '/about',
  CONTACT = '/contact',
}