
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  badge?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'beverages';
