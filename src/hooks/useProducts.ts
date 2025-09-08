import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = localStorage.getItem('shopEliteProducts');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        console.log('Loading products from storage:', parsedProducts);
        setProducts(parsedProducts);
      } else {
        console.log('No products found in storage, initializing empty array');
        setProducts([]);
      }
      setIsLoading(false);
    };

    loadProducts();

    // Add storage event listener for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'shopEliteProducts' && e.newValue) {
        const updatedProducts = JSON.parse(e.newValue);
        console.log('Storage event detected - Updating products:', updatedProducts);
        setProducts(updatedProducts);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      // Validate promo pricing
      if (product.isPromo && product.originalPrice && product.originalPrice <= product.price) {
        throw new Error('Original price must be higher than promo price');
      }
      
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        reviews: []
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts); // Update state immediately
      localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
      
      // Trigger storage event manually for other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'shopEliteProducts',
        newValue: JSON.stringify(updatedProducts)
      }));
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      // Validate promo pricing for updates
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        const updatedProduct = { ...existingProduct, ...updates };
        if (updatedProduct.isPromo && updatedProduct.originalPrice && updatedProduct.originalPrice <= updatedProduct.price) {
          throw new Error('Original price must be higher than promo price');
        }
      }
      
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      );
      setProducts(updatedProducts); // Update state immediately
      localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
      
      // Trigger storage event manually for other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'shopEliteProducts',
        newValue: JSON.stringify(updatedProducts)
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts); // Update state immediately
      localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
      
      // Trigger storage event manually for other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'shopEliteProducts',
        newValue: JSON.stringify(updatedProducts)
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};