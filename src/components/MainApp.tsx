import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductCatalog from './ProductCatalog';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import InfoPage from './InfoPage';
import Footer from './Footer';
import FAQ from './FAQ';
import WebsiteReviews from './WebsiteReviews';
import Chatbot from './Chatbot';
import { User, Product, CartItem, InfoPageType } from '../types';
import { useProducts } from '../hooks/useProducts';

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentInfoPage, setCurrentInfoPage] = useState<InfoPageType['type'] | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { products, isLoading } = useProducts();

  const addToCart = (product: Product, size?: string, color?: string) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1, size, color }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCartItems(prev => 
      prev.filter(item => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const updateCartItemQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        user={user} 
        onLogout={onLogout} 
        cartItemCount={getTotalItems()}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onInfoPageSelect={setCurrentInfoPage}
        onCategorySelect={handleCategorySelect}
        onScrollToProducts={scrollToProducts}
      />
      
      {currentInfoPage ? (
        <InfoPage 
          type={currentInfoPage}
          onBack={() => setCurrentInfoPage(null)}
        />
      ) : selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isInWishlist={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
        />
      ) : (
        <>
          <Hero />
          <ProductCatalog 
            products={products}
            isLoading={isLoading}
            onProductSelect={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <FAQ />
          <WebsiteReviews />
          <Footer onInfoPageSelect={setCurrentInfoPage} />
        </>
      )}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
      />
      
      <Chatbot />
    </div>
  );
};

export default MainApp;