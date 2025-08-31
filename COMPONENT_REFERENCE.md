# Elite Source - Component Reference

## Component Hierarchy

```
App
├── AuthPage (when not authenticated)
└── MainApp (when authenticated)
    ├── Header
    ├── Hero
    ├── ProductCatalog
    │   └── ProductCard (multiple)
    ├── FAQ
    ├── WebsiteReviews
    ├── Footer
    ├── Cart (sidebar)
    ├── ProductDetail (modal/page)
    │   └── ReviewSection
    ├── InfoPage (modal/page)
    ├── LookbookModal
    └── Chatbot (floating)

AdminDashboard (when admin authenticated)
├── ProductForm
└── Product Management Interface
```

## Component Details

### App.tsx
**Purpose**: Root application component managing authentication state
**State**: 
- `user: User | null` - Current authenticated user
- `isLoading: boolean` - Initial load state

**Key Functions**:
- `handleLogin(userData: User)` - Sets user and stores in localStorage
- `handleLogout()` - Clears user and removes from localStorage

### AuthPage.tsx
**Purpose**: Authentication interface with login/signup
**Features**:
- Sliding background images (5 luxury fashion photos)
- Email/password authentication
- Admin credential detection
- Google OAuth integration (configured)
- Form validation and loading states

**Background Images**:
- Auto-rotating every 5 seconds
- Manual navigation via indicators
- Smooth transitions with overlay effects

### MainApp.tsx
**Purpose**: Main application wrapper for authenticated users
**State Management**:
- Cart items with size/color variants
- Wishlist functionality
- Product selection and detail view
- Info page navigation
- Category filtering

**Key Functions**:
- `addToCart(product, size?, color?)` - Adds items with variants
- `removeFromCart(id, size?, color?)` - Removes specific variants
- `updateCartItemQuantity()` - Updates quantities
- `toggleWishlist(productId)` - Manages wishlist

### Header.tsx
**Purpose**: Navigation header with user menu and cart
**Features**:
- Responsive navigation menu
- Cart item count badge
- User profile dropdown
- Category navigation
- Mobile hamburger menu

**Navigation Categories**:
- New Arrivals
- Women
- Men  
- Kids
- Accessories
- Sale

### Hero.tsx
**Purpose**: Landing page hero section
**Features**:
- Full-screen background image
- Call-to-action buttons
- Lookbook modal trigger
- Scroll indicator animation

### ProductCatalog.tsx
**Purpose**: Product grid with filtering and search
**Features**:
- Category filtering
- Responsive grid layout
- Loading states with skeleton UI
- Product count display
- Mobile-friendly filters

**Filter Categories**:
- All Collections
- New Arrivals
- Women
- Men
- Kids
- Accessories
- Sale

### ProductCard.tsx
**Purpose**: Individual product display in grid
**Features**:
- Hover effects and animations
- Wishlist toggle
- WhatsApp request button
- Promotional pricing display
- Featured product badges

**Hover States**:
- Image zoom effect
- Overlay with "VIEW DETAILS"
- Quick action buttons appear
- Color transitions

### ProductDetail.tsx
**Purpose**: Detailed product view with purchase options
**Features**:
- Large product image
- Size and color selection
- Quantity controls
- Add to cart functionality
- WhatsApp product request
- Wishlist toggle
- Product specifications
- Customer reviews section

**Size Options**: XS, S, M, L, XL, XXL
**Color Options**: Black, White, Navy, Burgundy

### Cart.tsx
**Purpose**: Shopping cart sidebar
**Features**:
- Sliding panel interface
- Item quantity management
- Size/color variant display
- Total calculation
- Checkout preparation
- Empty cart state

### ReviewSection.tsx
**Purpose**: Customer reviews and ratings
**Features**:
- Star rating display
- Review submission form
- Rating distribution chart
- Verified purchase badges
- Review sorting and filtering

### FAQ.tsx
**Purpose**: Frequently asked questions with search
**Features**:
- Search functionality
- Category filtering
- Expandable Q&A items
- WhatsApp contact integration
- Responsive design

**FAQ Categories**:
- General
- Shipping
- Returns & Exchanges
- Sizing
- Payment
- Account

### WebsiteReviews.tsx
**Purpose**: Overall website testimonials
**Features**:
- Customer testimonial grid
- Average rating display
- Verified review badges
- Location display
- Date formatting

### Chatbot.tsx
**Purpose**: AI-powered customer service chat
**Features**:
- Floating chat button
- Message history
- Typing indicators
- FAQ-based responses
- WhatsApp integration suggestions
- Auto-responses for common queries

**Response Categories**:
- Product information
- Shipping details
- Return policies
- Size guidance
- Payment methods
- Contact information

### LookbookModal.tsx
**Purpose**: Fashion lookbook slideshow
**Features**:
- Full-screen modal experience
- Auto-advancing slides (4-second intervals)
- Manual navigation controls
- Play/pause functionality
- Progress indicators
- Slide counter
- Call-to-action buttons

**Lookbook Slides**:
1. Spring Collection 2025 - Ethereal Elegance
2. Executive Power - Sophisticated Authority
3. Evening Glamour - Timeless Luxury
4. Casual Luxury - Effortless Chic
5. Accessories Collection - Perfect Finishing Touches

### InfoPage.tsx
**Purpose**: Static information pages
**Supported Pages**:
- About Us
- Privacy Policy
- Terms of Service
- Size Guide
- Shipping Information
- Returns & Exchanges
- Contact Us

**Features**:
- Responsive layouts
- Contact forms
- Social media integration
- Business hours display
- Size charts and tables

### Footer.tsx
**Purpose**: Site footer with links and information
**Features**:
- Brand logo and description
- Social media links
- Quick navigation links
- Legal page links
- Copyright information

### AdminDashboard.tsx
**Purpose**: Administrative interface for product management
**Features**:
- Product statistics overview
- Product CRUD operations
- Inventory management
- Featured product controls
- Promotional pricing management

**Admin Views**:
- Overview (statistics)
- Product Management (list/edit/delete)
- Add Product (creation form)

### ProductForm.tsx
**Purpose**: Form for adding/editing products
**Features**:
- Image upload with preview
- Promotional pricing controls
- Category selection
- Specification management
- Stock status controls
- Featured product toggle

**Validation**:
- Required field validation
- Price validation (promo < original)
- Image format validation
- SKU uniqueness

## Styling System

### Color Classes
```css
/* Primary Colors */
.text-gold { color: #D4AF37; }
.bg-gold { background-color: #D4AF37; }
.border-gold { border-color: #D4AF37; }

/* Backgrounds */
.bg-black { background-color: #000000; }
.bg-gray-900 { background-color: #111827; }
.bg-gray-800 { background-color: #1F2937; }
```

### Animation Classes
```css
.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
.animate-slide-up { animation: slideUp 0.5s ease-out; }
.animate-slide-in-left { animation: slideInFromLeft 0.6s ease-out; }
.animate-slide-in-right { animation: slideInFromRight 0.6s ease-out; }
```

### Responsive Breakpoints
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up

## State Management Patterns

### Local State
```typescript
// Component-level state for UI interactions
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
```

### Lifted State
```typescript
// State lifted to parent for sharing between siblings
// Example: Cart state in MainApp shared between Header and Cart
```

### Persistent State
```typescript
// localStorage for data persistence
const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromStorage = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};
```

## Event Handling Patterns

### Product Selection
```typescript
// From ProductCatalog to ProductDetail
const handleProductSelect = (product: Product) => {
  setSelectedProduct(product);
};
```

### Cart Management
```typescript
// Add to cart with variants
const addToCart = (product: Product, size?: string, color?: string) => {
  const existingItem = cartItems.find(
    item => item.id === product.id && item.size === size && item.color === color
  );
  
  if (existingItem) {
    updateQuantity(existingItem.id, existingItem.quantity + 1, size, color);
  } else {
    setCartItems(prev => [...prev, { ...product, quantity: 1, size, color }]);
  }
};
```

### WhatsApp Integration
```typescript
// Product request via WhatsApp
const handleWhatsAppRequest = (product: Product) => {
  const message = `Hi! I'm interested in: ${product.name} - $${product.price}`;
  const url = `https://wa.me/17136890528?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

## Error Boundaries

### Recommended Implementation
```typescript
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gold text-black px-6 py-3 rounded-lg font-bold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Testing Strategies

### Component Testing
```typescript
// Example test for ProductCard
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    category: 'women',
    image: 'test.jpg',
    description: 'Test description',
    inStock: true,
    isPromo: false
  };

  it('renders product information', () => {
    render(
      <ProductCard 
        product={mockProduct}
        onSelect={jest.fn()}
        isInWishlist={false}
        onToggleWishlist={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});
```

### Integration Testing
```typescript
// Test complete user flows
describe('Shopping Flow', () => {
  it('should allow user to add product to cart', async () => {
    // Test implementation
  });
  
  it('should calculate cart total correctly', async () => {
    // Test implementation
  });
});
```

## Accessibility Guidelines

### ARIA Labels
```typescript
// Example implementation
<button aria-label="Add to wishlist">
  <Heart className="w-5 h-5" />
</button>

<img src={product.image} alt={`${product.name} - ${product.description}`} />
```

### Keyboard Navigation
- All interactive elements should be keyboard accessible
- Proper tab order implementation
- Focus indicators for all focusable elements
- Escape key handling for modals

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive link text
- Form labels and validation messages

## Performance Best Practices

### Image Optimization
```typescript
// Lazy loading implementation
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
```

### Code Splitting
```typescript
// Route-based code splitting
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills Required
- None (modern browsers only)

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

## Maintenance Tasks

### Weekly
- [ ] Update product inventory
- [ ] Review customer feedback
- [ ] Check for broken images
- [ ] Monitor site performance

### Monthly  
- [ ] Update dependencies
- [ ] Review analytics data
- [ ] Update FAQ content
- [ ] Security audit

### Quarterly
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] User experience review
- [ ] Technology stack evaluation

This reference should be updated whenever new components are added or existing ones are significantly modified.