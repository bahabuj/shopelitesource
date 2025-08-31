export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  isAdmin?: boolean;
  emailVerified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Original price before discount
  isPromo: boolean; // Whether this product is on promotion
  category: string;
  image: string;
  description: string;
  detailedDescription?: string; // Extended description for product details
  specifications?: string[]; // Product specifications/features
  materials?: string; // Materials used
  careInstructions?: string; // Care and maintenance instructions
  brand?: string; // Brand name
  sku?: string; // Stock keeping unit
  inStock: boolean;
  featured?: boolean;
  reviews?: Review[]; // Customer reviews for this product
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
  verified?: boolean; // Whether this is a verified purchase
}
export interface InfoPageType {
  type: 'about' | 'privacy' | 'terms' | 'size-guide' | 'shipping' | 'returns' | 'faq' | 'contact';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'shipping' | 'returns' | 'sizing' | 'payment' | 'account';
}

export interface WebsiteReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
  verified: boolean;
}