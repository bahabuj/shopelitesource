# Elite Source - Deployment Guide

## Overview

This guide covers deploying the Elite Source luxury fashion e-commerce platform to various hosting providers and environments.

## Quick Deployment (Bolt Hosting)

### Prerequisites
- Project built and tested locally
- All dependencies installed
- No environment variables required

### Deployment Steps
1. Ensure all files are saved and committed
2. Run build command: `npm run build`
3. Deploy to Bolt Hosting (automatic via platform)
4. Verify deployment at provided URL

### Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18+

## Alternative Hosting Providers

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

**vercel.json Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## Environment Configuration

### Current Setup (No Environment Variables)
The application currently runs without environment variables, using:
- localStorage for data persistence
- Hardcoded social media links
- Direct WhatsApp integration

### Production Environment Variables (Recommended)
```env
# Database
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# External Services
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name

# Contact Information
VITE_WHATSAPP_NUMBER=17136890528
VITE_SUPPORT_EMAIL=elitesourceng@gmail.com

# Social Media
VITE_FACEBOOK_URL=https://www.facebook.com/profile.php?id=61579619709075
VITE_INSTAGRAM_URL=https://www.instagram.com/elitesourceng/
```

## Database Migration (Production)

### Supabase Setup
1. Create Supabase project
2. Set up authentication
3. Create database tables:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  is_promo BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  specifications TEXT[],
  materials TEXT,
  care_instructions TEXT,
  brand TEXT,
  sku TEXT UNIQUE,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Cart policies
CREATE POLICY "Users can manage own cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON wishlist_items
  FOR ALL USING (auth.uid() = user_id);
```

## Payment Integration (Stripe)

### Setup Steps
1. Create Stripe account
2. Get API keys (publishable and secret)
3. Install Stripe SDK: `npm install @stripe/stripe-js`

### Implementation Example
```typescript
// src/utils/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (items: CartItem[]) => {
  const stripe = await stripePromise;
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  
  const session = await response.json();
  
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  });
  
  if (result?.error) {
    console.error(result.error.message);
  }
};
```

## Image Management (Cloudinary)

### Setup
1. Create Cloudinary account
2. Get cloud name and API credentials
3. Install SDK: `npm install cloudinary`

### Upload Implementation
```typescript
// src/utils/cloudinary.ts
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'elite_source_products');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  const data = await response.json();
  return data.secure_url;
};
```

## SEO Optimization

### Meta Tags Setup
```html
<!-- index.html -->
<meta name="description" content="Elite Source - Luxury fashion boutique featuring designer clothing, accessories, and exclusive pieces from prestigious fashion houses">
<meta name="keywords" content="luxury fashion, designer clothing, haute couture, premium accessories, exclusive fashion">
<meta property="og:title" content="Elite Source - Luxury Fashion Boutique">
<meta property="og:description" content="Discover luxury fashion and designer pieces from the world's most prestigious brands">
<meta property="og:image" content="/elite-logo.png">
<meta property="og:url" content="https://shopeliteresource.com">
<meta name="twitter:card" content="summary_large_image">
```

### Structured Data
```typescript
// Add to index.html
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "Elite Source",
  "description": "Luxury fashion boutique",
  "url": "https://shopeliteresource.com",
  "telephone": "+1-713-689-0528",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "addressCountry": "US"
  }
};
```

## Performance Monitoring

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring Tools
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals extension
- Real User Monitoring (RUM)

### Optimization Techniques
```typescript
// Lazy loading components
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

// Image optimization
const optimizedImageUrl = (url: string, width: number) => {
  return `${url}?w=${width}&q=80&fm=webp`;
};
```

## Security Checklist

### Pre-Deployment
- [ ] Remove console.log statements
- [ ] Validate all user inputs
- [ ] Implement proper error handling
- [ ] Check for exposed sensitive data
- [ ] Verify HTTPS configuration
- [ ] Test authentication flows
- [ ] Validate admin access controls

### Post-Deployment
- [ ] Monitor for security vulnerabilities
- [ ] Regular dependency updates
- [ ] SSL certificate monitoring
- [ ] Access log review
- [ ] Performance monitoring

## Backup and Recovery

### Data Backup (Production)
```typescript
// Automated backup script
const backupData = async () => {
  const { data: products } = await supabase.from('products').select('*');
  const { data: users } = await supabase.from('profiles').select('*');
  const { data: reviews } = await supabase.from('reviews').select('*');
  
  const backup = {
    timestamp: new Date().toISOString(),
    products,
    users,
    reviews
  };
  
  // Store backup securely
  await storeBackup(backup);
};
```

### Recovery Procedures
1. Identify the issue scope
2. Restore from latest backup
3. Verify data integrity
4. Test critical functionality
5. Monitor for recurring issues

## Scaling Considerations

### Traffic Growth
- Implement CDN for static assets
- Consider server-side rendering (SSR)
- Optimize database queries
- Implement caching strategies

### Feature Expansion
- Modular component architecture
- API versioning strategy
- Database schema evolution
- Microservices consideration

## Contact for Technical Support

- **Business Email**: elitesourceng@gmail.com
- **WhatsApp**: +1 (713) 689-0528
- **Location**: Houston, TX

For urgent technical issues, contact via WhatsApp for fastest response.