
import { MenuItem, Room, BlogPost, Testimonial, MenuCategory } from './types';

export const MENU_DATA: Record<MenuCategory, MenuItem[]> = {
  starters: [
    { name: 'Nawabi Galouti Kebab', description: 'Legendary mouth-melting lamb kebabs with a blend of 150 spices', price: '₹995', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', tags: ['Signature', 'Mughlai'] },
    { name: 'Tandoori Jhinga', description: 'Jumbo prawns marinated in yellow chili and hung curd', price: '₹1,295', image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=400&q=80', tags: ['Seafood'] },
    { name: 'Burrata & Heirloom Tomatoes', description: 'Fresh burrata with vine tomatoes, basil oil, and aged balsamic', price: '₹795', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80', tags: ['Vegetarian'] },
    { name: 'Kakori Kebab', description: 'Fine minced mutton skewers grilled to perfection over charcoal', price: '₹945', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', tags: ['Signature'] },
    { name: 'Paneer Pashmina Tikka', description: 'Saffron-infused cottage cheese layered with spiced mawa', price: '₹645', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', tags: ['Vegetarian', 'Indian'] }
  ],
  mains: [
    { name: 'Nawab Saheb Dum Biryani', description: 'Aromatic long-grain basmati rice cooked with succulent lamb in a sealed handi', price: '₹1,495', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', tags: ['Signature', 'Chef\'s Special'] },
    { name: 'Murgh Makhani Royale', description: 'Classic charcoal-grilled chicken in a creamy tomato gravy', price: '₹995', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80', tags: ['Indian', 'Signature'] },
    { name: 'Dal Nawab Saheb', description: '24-hour slow-cooked black lentils finished with white butter', price: '₹795', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80', tags: ['Vegetarian', 'Legendary'] },
    { name: 'Nalli Nihari', description: 'Slow-cooked lamb shanks in a rich, spiced flour-based gravy', price: '₹1,395', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', tags: ['Signature'] }
  ],
  desserts: [
    { name: 'Shahi Tukda', description: 'Golden fried bread soaked in saffron rabri and garnished with gold leaf', price: '₹595', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', tags: ['Royal'] },
    { name: 'Gulab Jamun Cheesecake', description: 'Fusion dessert combining warm syrup-soaked dumplings with creamy cheese', price: '₹495', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', tags: ['Indian Fusion'] },
    { name: 'Kesari Phirni', description: 'Creamy ground rice pudding flavored with saffron and cardamom', price: '₹395', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', tags: ['Traditional'] }
  ],
  beverages: [
    { name: 'Saffron Lassi', description: 'Traditional yogurt drink infused with premium saffron', price: '₹395', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', tags: ['Refreshing'] },
    { name: 'Masala Kokum Cooler', description: 'A tangy Mumbai favorite with a spicy twist', price: '₹345', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80', tags: ['Non-Alcoholic'] }
  ]
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'deluxe',
    name: 'Executive Room',
    description: 'Modern comfort overlooking the Powai lake, perfect for business travelers.',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    amenities: ['King Bed', 'Lake View', 'Ergonomic Desk', 'AC']
  },
  {
    id: 'premium',
    name: 'Westin Club Room',
    description: 'Exclusive access to the Club Lounge with stunning panoramic views.',
    price: 17999,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
    amenities: ['Lounge Access', 'Jacuzzi', 'Mini Bar', 'High Floor'],
    badge: 'Most Popular'
  },
  {
    id: 'suite',
    name: 'Presidential Suite',
    description: 'Opulence reimagined with private dining and expansive living space.',
    price: 44999,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    amenities: ['Private Butler', 'Large Terrace', 'Spa Room', 'Home Theatre']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Vikram Malhotra', role: 'Business Consultant', text: 'The Galouti Kebabs at Nawab Saheb are truly the best in Mumbai. The service is royal, fitting the name.', rating: 5, avatar: 'https://picsum.photos/100/100?random=1' },
  { name: 'Anjali Desai', role: 'Food Critic', text: 'Nawab Saheb beautifully blends the heritage of Awadh with the modern luxury of Powai. A must-visit for Mughlai lovers.', rating: 5, avatar: 'https://picsum.photos/100/100?random=2' },
  { name: 'Sameer Khan', role: 'Corporate VP', text: 'Impeccable dining experience. The slow-cooked dal is a revelation. The view of Powai Lake adds to the charm.', rating: 5, avatar: 'https://picsum.photos/100/100?random=3' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Secret Spices of the Galouti Kebab',
    excerpt: 'Step inside the kitchen of Nawab Saheb to see how our chefs craft the legendary melt-in-the-mouth kebab.',
    date: 'Jan 10, 2025',
    author: 'Chef Qureshi',
    category: 'Culinary Secrets',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
    content: 'The legendary Galouti Kebab was originally created for a Nawab of Lucknow who had lost his teeth but not his appetite for meat. At Nawab Saheb, we honor this 200-year-old tradition. Our Master Chef Qureshi uses a secret blend of 150 spices, some rare and sourced specifically from Awadh. The meat is finely minced and marinated with raw papaya and these secret spices for hours before being grilled on a mahi tawa.'
  },
  {
    id: 2,
    title: 'Powai Lake: A Serene Backdrop for Royal Dining',
    excerpt: 'How the tranquility of the lake enhances the regal experience at Nawab Saheb.',
    date: 'Jan 05, 2025',
    author: 'Marketing Team',
    category: 'Experience',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
    content: 'Located within The Westin Mumbai Powai Lake, Nawab Saheb offers more than just food; it offers a vista. As the sun sets over the Powai Lake, the restaurant transforms into a royal court. The shimmering lights on the water reflect the warmth of our hospitality.'
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80',
  'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1200&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80'
];
