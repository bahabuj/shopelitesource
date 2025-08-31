# Elite Source - API Documentation

## Overview

This document outlines the data structures, component APIs, and integration points for the Elite Source luxury fashion e-commerce platform.

## Component APIs

### AuthPage Component

**Props:**
```typescript
interface AuthPageProps {
  onLogin: (user: User) => void;
}
```

**Features:**
- Email/password authentication
- User registration
- Admin login detection
- Sliding background images
- Google OAuth integration (configured but not active)

**Usage:**
```tsx
<AuthPage onLogin={handleLogin} />
```

### MainApp Component

**Props:**
```typescript
interface MainAppProps {
  user: User;
  onLogout: () => void;
}
```

**State Management:**
- Cart items (CartItem[])
- Wishlist (string[])
- Selected product (Product | null)
- Current info page (InfoPageType['type'] | null)
- Selected category (string)

### ProductCatalog Component

**Props:**
```typescript
interface ProductCatalogProps {
  products: Product[];
  isLoading: boolean;
  onProductSelect: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}
```

**Features:**
- Category filtering
- Product grid display
- Wishlist integration
- Loading states
- Responsive design

### Cart Component

**Props:**
```typescript
interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (id: string, size?: string, color?: string) => void;
}
```

**Features:**
- Sliding panel interface
- Quantity management
- Size/color variant support
- Total calculation
- Checkout preparation

### ProductDetail Component

**Props:**
```typescript
interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}
```

**Features:**
- Full product information display
- Size and color selection
- Quantity selection
- WhatsApp integration
- Customer reviews section

### AdminDashboard Component

**Props:**
```typescript
interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}
```

**Features:**
- Product CRUD operations
- Dashboard overview with statistics
- Product form management
- Inventory tracking

## Data Management

### useProducts Hook

**Returns:**
```typescript
{
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}
```

**Storage:** localStorage key `shopEliteProducts`

**Validation:**
- Promotional pricing validation (originalPrice > price)
- Required field validation
- Image URL validation

### Authentication System

**Storage:** localStorage key `shopEliteUser`

**Admin Detection:**
```typescript
const isAdmin = user.email === 'admin@shopelitesource.com' && user.isAdmin === true;
```

**Session Management:**
- Automatic session restoration on app load
- Secure logout with localStorage cleanup

## External Integrations

### WhatsApp Integration

**Base URL:** `https://wa.me/17136890528`

**Product Request Format:**
```typescript
const message = `Hi! I'm interested in this product from Elite Source:

Product: ${product.name}
Price: $${product.price.toLocaleString()}
Category: ${product.category.toUpperCase()}

Could you please provide more information about this item?

Product Image: ${product.image}`;

const whatsappUrl = `https://wa.me/17136890528?text=${encodeURIComponent(message)}`;
```

**Contact Support:**
```typescript
const supportUrl = `https://wa.me/17136890528?text=Hello,%20I%20have%20a%20question%20about%20Elite%20Source`;
```

### Social Media Links

**Facebook:** https://www.facebook.com/profile.php?id=61579619709075
**Instagram:** https://www.instagram.com/elitesourceng/
**WhatsApp:** +1 (713) 689-0528

## State Flow Diagrams

### Authentication Flow
```
App Load → Check localStorage → 
  ├── User Found → Validate → MainApp/AdminDashboard
  └── No User → AuthPage → Login/Signup → Store User → MainApp
```

### Product Management Flow
```
Admin Login → AdminDashboard → 
  ├── Add Product → ProductForm → Validate → Save → Update List
  ├── Edit Product → ProductForm → Update → Save → Update List
  └── Delete Product → Confirm → Remove → Update List
```

### Shopping Flow
```
Browse Products → Select Product → ProductDetail → 
  ├── Add to Cart → Cart Sidebar → Checkout
  ├── Add to Wishlist → Wishlist State
  └── WhatsApp Request → External WhatsApp
```

## Error Handling

### Product Form Validation
```typescript
// Promotional pricing validation
if (product.isPromo && product.originalPrice && product.originalPrice <= product.price) {
  throw new Error('Original price must be higher than promo price');
}
```

### Image Upload Handling
```typescript
// File type validation
const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!validTypes.includes(file.type)) {
  throw new Error('Invalid file type');
}
```

### Authentication Error Handling
```typescript
// Session validation
try {
  const savedUser = localStorage.getItem('shopEliteUser');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    // Validate user structure
    if (user.id && user.email) {
      setUser(user);
    }
  }
} catch (error) {
  console.error('Session restoration failed:', error);
  localStorage.removeItem('shopEliteUser');
}
```

## Performance Optimization

### Image Loading
- Use appropriate image sizes (recommended: 800x1000px for products)
- Implement lazy loading for product grids
- Consider WebP format for better compression

### Component Optimization
- Use React.memo for expensive components
- Implement useMemo for complex calculations
- Use useCallback for event handlers passed to children

### Bundle Optimization
- Code splitting for admin dashboard
- Lazy loading for modals and overlays
- Tree shaking for unused Lucide icons

## Security Best Practices

### Input Validation
- Sanitize all user inputs
- Validate file uploads
- Implement proper form validation

### Data Protection
- Never store sensitive data in localStorage
- Implement proper session management
- Use HTTPS in production

### XSS Prevention
- React's built-in XSS protection
- Validate and sanitize HTML content
- Use proper content security policies

## Testing Guidelines

### Component Testing
```typescript
// Example test structure
describe('ProductCard', () => {
  it('should display product information correctly', () => {
    // Test implementation
  });
  
  it('should handle wishlist toggle', () => {
    // Test implementation
  });
  
  it('should open WhatsApp with correct message', () => {
    // Test implementation
  });
});
```

### Integration Testing
- Test complete user flows
- Validate data persistence
- Test responsive design
- Verify accessibility compliance

## Deployment

### Build Process
```bash
npm run build
```

### Output
- **Directory**: `dist/`
- **Assets**: Optimized and hashed
- **HTML**: Single page application

### Environment Configuration
- No environment variables required for current implementation
- All configuration is hardcoded for demo purposes

## Monitoring and Analytics

### Recommended Metrics
- Page load times
- User engagement (time on site, pages per session)
- Conversion rates (product views to cart additions)
- Cart abandonment rates
- Customer satisfaction scores

### Error Tracking
- Implement error boundary components
- Log client-side errors
- Monitor API response times
- Track user feedback

## Maintenance Schedule

### Daily
- Monitor customer inquiries via WhatsApp
- Check for any reported issues
- Review new customer reviews

### Weekly
- Update product inventory status
- Review and respond to customer feedback
- Check website performance metrics

### Monthly
- Update dependencies
- Review and update FAQ content
- Analyze user behavior patterns
- Plan new feature implementations

### Quarterly
- Comprehensive security review
- Performance optimization review
- User experience assessment
- Technology stack evaluation

## Migration Path to Production

### Database Setup
1. Set up Supabase project
2. Create user authentication tables
3. Migrate product data from localStorage
4. Implement real-time data synchronization

### Payment Integration
1. Set up Stripe account
2. Implement payment processing
3. Add order management system
4. Create invoice generation

### Image Management
1. Set up Cloudinary account
2. Migrate product images
3. Implement image optimization
4. Add image upload pipeline

### Email System
1. Set up email service (SendGrid, Mailgun)
2. Create email templates
3. Implement order confirmations
4. Add newsletter functionality

## Support and Maintenance

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components follow single responsibility principle
- [ ] Proper error handling is implemented
- [ ] Accessibility guidelines are followed
- [ ] Performance best practices are applied
- [ ] Security considerations are addressed

### Release Process
1. Code review and testing
2. Update version numbers
3. Build and test production bundle
4. Deploy to staging environment
5. Final testing and approval
6. Deploy to production
7. Monitor for issues

## Troubleshooting Common Issues

### Product Images Not Loading
- Check image URL validity
- Verify CORS settings for external images
- Ensure proper image format (JPG, PNG, WebP)

### Cart Not Persisting
- Current implementation doesn't persist cart
- Consider implementing localStorage persistence
- Or migrate to database storage

### Admin Access Issues
- Verify admin credentials exactly match
- Check localStorage for existing sessions
- Clear browser cache if needed

### Mobile Responsiveness
- Test on various device sizes
- Verify touch interactions work properly
- Check that modals display correctly on mobile

This documentation should be updated as the application evolves and new features are added.