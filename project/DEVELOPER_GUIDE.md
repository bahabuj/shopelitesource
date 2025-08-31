# Elite Source - Developer Documentation

## Project Overview

Elite Source is a luxury fashion e-commerce platform built with React, TypeScript, and Tailwind CSS. The application features user authentication, product management, shopping cart functionality, customer reviews, and an admin dashboard.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gold theme
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence
- **Authentication**: Custom email/password system

## Project Structure

```
src/
├── components/           # React components
│   ├── AdminDashboard.tsx    # Admin interface for product management
│   ├── AuthPage.tsx          # Login/signup page with sliding backgrounds
│   ├── Cart.tsx              # Shopping cart sidebar
│   ├── Chatbot.tsx           # AI-powered customer service chatbot
│   ├── FAQ.tsx               # Frequently asked questions with search
│   ├── Footer.tsx            # Site footer with links and social media
│   ├── GoogleCallback.tsx    # Google OAuth callback handler
│   ├── Header.tsx            # Navigation header with cart and user menu
│   ├── Hero.tsx              # Landing page hero section
│   ├── InfoPage.tsx          # Static pages (about, privacy, etc.)
│   ├── LookbookModal.tsx     # Fashion lookbook slideshow modal
│   ├── MainApp.tsx           # Main application wrapper
│   ├── ProductCard.tsx       # Individual product display card
│   ├── ProductCatalog.tsx    # Product grid with filtering
│   ├── ProductDetail.tsx     # Detailed product view
│   ├── ProductForm.tsx       # Admin form for adding/editing products
│   ├── ReviewSection.tsx     # Customer reviews and rating system
│   └── WebsiteReviews.tsx    # Overall website testimonials
├── data/                 # Static data files
│   ├── faq.ts               # FAQ questions and answers
│   └── websiteReviews.ts    # Customer testimonials
├── hooks/                # Custom React hooks
│   └── useProducts.ts       # Product management hook
├── types/                # TypeScript type definitions
│   └── index.ts             # All application types
├── App.tsx               # Root application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and animations
```

## Key Features

### 1. User Authentication
- **Location**: `src/components/AuthPage.tsx`
- **Features**: Email/password login, user registration, admin access
- **Admin Credentials**: 
  - Email: `admin@shopelitesource.com`
  - Password: `admin123`
- **Storage**: User sessions stored in localStorage as `shopEliteUser`

### 2. Product Management
- **Admin Interface**: `src/components/AdminDashboard.tsx`
- **Product Form**: `src/components/ProductForm.tsx`
- **Data Hook**: `src/hooks/useProducts.ts`
- **Storage**: Products stored in localStorage as `shopEliteProducts`
- **Features**: 
  - Add/edit/delete products
  - Promotional pricing with original price display
  - Image upload support
  - Category management
  - Stock status tracking
  - Featured product designation

### 3. Shopping Cart
- **Component**: `src/components/Cart.tsx`
- **Features**: Add/remove items, quantity adjustment, size/color selection
- **Storage**: Cart state managed in React state (not persisted)

### 4. Customer Reviews
- **Component**: `src/components/ReviewSection.tsx`
- **Features**: Star ratings, verified purchase badges, review submission
- **Integration**: Reviews are part of product data structure

### 5. Interactive Chatbot
- **Component**: `src/components/Chatbot.tsx`
- **Features**: 
  - FAQ-based responses
  - Product information
  - WhatsApp integration
  - Typing indicators
  - Message history

### 6. Lookbook Modal
- **Component**: `src/components/LookbookModal.tsx`
- **Features**: 
  - Auto-advancing slideshow
  - Manual navigation
  - Play/pause controls
  - Progress indicators
  - Full-screen immersive experience

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  isAdmin?: boolean;
  emailVerified?: boolean;
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  isPromo: boolean;
  category: string;
  image: string;
  description: string;
  detailedDescription?: string;
  specifications?: string[];
  materials?: string;
  careInstructions?: string;
  brand?: string;
  sku?: string;
  inStock: boolean;
  featured?: boolean;
  reviews?: Review[];
}
```

### CartItem
```typescript
interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}
```

## Styling System

### Color Palette
- **Primary Gold**: `#D4AF37` (Tailwind: `gold`)
- **Dark Gold**: `#B8941F` (Tailwind: `gold-dark`)
- **Background**: Black (`#000000`)
- **Cards/Panels**: Gray-900 (`#111827`)
- **Borders**: Gray-800 (`#1F2937`)
- **Text**: White primary, Gray-400 secondary

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Headings**: Bold, tracking-wider for luxury feel
- **Body**: Regular weight, leading-relaxed for readability

### Animations
- **fadeIn**: 0.5s ease-in-out
- **slideUp**: 0.5s ease-out
- **slideInFromLeft**: 0.6s ease-out
- **slideInFromRight**: 0.6s ease-out

## External Integrations

### Social Media
- **Facebook**: https://www.facebook.com/profile.php?id=61579619709075
- **Instagram**: https://www.instagram.com/elitesourceng/
- **WhatsApp**: +1 (713) 689-0528

### WhatsApp Integration
- **Product Requests**: Direct links to WhatsApp with pre-filled product information
- **Customer Support**: Integrated chat support through WhatsApp
- **Contact**: General contact through WhatsApp messaging

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Bolt Hosting
The application is configured for deployment to Bolt Hosting:
```bash
npm run build
```
Output directory: `dist/`

### Environment Variables
No environment variables required for basic functionality. All data is stored in localStorage for demo purposes.

## Data Storage

### Current Implementation (localStorage)
- **Users**: `shopEliteUser` - Current user session
- **Products**: `shopEliteProducts` - Product catalog
- **Cart**: React state (not persisted)
- **Wishlist**: React state (not persisted)

### Future Database Migration
For production deployment, consider migrating to:
- **Supabase** for user authentication and data storage
- **Stripe** for payment processing
- **Cloudinary** for image management

## Component Architecture

### Main Application Flow
1. **App.tsx** - Root component, handles authentication state
2. **AuthPage.tsx** - Login/signup interface
3. **MainApp.tsx** - Main application for authenticated users
4. **AdminDashboard.tsx** - Admin interface for product management

### State Management
- **User State**: Managed in App.tsx, passed down through props
- **Product State**: Managed via useProducts hook
- **Cart State**: Local state in MainApp.tsx
- **UI State**: Local state in individual components

## Customization Guide

### Adding New Product Categories
1. Update the categories array in `ProductCatalog.tsx`
2. Add category option in `ProductForm.tsx`
3. Update header navigation in `Header.tsx`

### Modifying Color Scheme
1. Update Tailwind config in `tailwind.config.js`
2. Update CSS custom properties in `index.css`
3. Search and replace color classes throughout components

### Adding New Pages
1. Create new component in `src/components/`
2. Add route type to `InfoPageType` in `types/index.ts`
3. Update `InfoPage.tsx` with new page content
4. Add navigation links in `Footer.tsx` or `Header.tsx`

## Performance Considerations

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for product images
- Consider CDN for image delivery

### Code Splitting
- Implement React.lazy() for large components
- Split admin dashboard into separate bundle
- Lazy load product detail modal

### Caching Strategy
- Implement service worker for offline functionality
- Cache product images and static assets
- Consider implementing product data caching

## Security Considerations

### Current Implementation
- Client-side authentication (demo only)
- No sensitive data exposure
- XSS protection through React's built-in sanitization

### Production Recommendations
- Implement server-side authentication
- Add CSRF protection
- Validate all user inputs
- Implement rate limiting
- Use HTTPS for all communications

## Testing Strategy

### Recommended Testing Approach
1. **Unit Tests**: Component logic and utility functions
2. **Integration Tests**: User flows and component interactions
3. **E2E Tests**: Complete user journeys
4. **Visual Regression**: UI consistency across updates

### Test Files Structure
```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── test-utils/
    └── setup.ts
```

## Maintenance Tasks

### Regular Updates
- Update dependencies monthly
- Review and update product images
- Monitor and respond to customer reviews
- Update FAQ content based on customer inquiries

### Performance Monitoring
- Monitor page load times
- Track user engagement metrics
- Monitor cart abandonment rates
- Review mobile responsiveness

## Troubleshooting

### Common Issues
1. **Products not loading**: Check localStorage data and useProducts hook
2. **Images not displaying**: Verify image URLs and file paths
3. **Cart not updating**: Check CartItem interface and state management
4. **Authentication issues**: Verify user data structure and localStorage

### Debug Tools
- React Developer Tools
- Browser localStorage inspector
- Network tab for image loading issues
- Console for JavaScript errors

## Future Enhancements

### Recommended Features
1. **Search Functionality**: Product search with filters
2. **User Profiles**: Extended user management
3. **Order History**: Track past purchases
4. **Inventory Management**: Real-time stock tracking
5. **Email Notifications**: Order confirmations and updates
6. **Multi-language Support**: International expansion
7. **Mobile App**: React Native implementation
8. **Analytics Dashboard**: Sales and user behavior tracking

### Technical Improvements
1. **Database Migration**: Move from localStorage to proper database
2. **Payment Integration**: Stripe or similar payment processor
3. **Image Management**: Cloudinary or similar service
4. **SEO Optimization**: Meta tags and structured data
5. **Performance Optimization**: Code splitting and lazy loading
6. **Accessibility**: WCAG compliance improvements

## Contact Information

For technical support or questions about this codebase:
- **Business Email**: elitesourceng@gmail.com
- **WhatsApp**: +1 (713) 689-0528
- **Location**: Houston, TX

## License

This project is proprietary software owned by Elite Source. All rights reserved.