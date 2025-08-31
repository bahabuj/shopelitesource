import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from backend
    const loadProducts = () => {
      setTimeout(() => {
        const savedProducts = localStorage.getItem('shopEliteProducts');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Initialize with empty array - admin can add products
          setProducts([]);
        }
        setIsLoading(false);
      }, 1000);
    };

    loadProducts();
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    // Validate promo pricing
    if (product.isPromo && product.originalPrice && product.originalPrice <= product.price) {
      throw new Error('Original price must be higher than promo price');
    }
    
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      reviews: [] // Initialize with empty reviews array
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
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
    setProducts(updatedProducts);
    localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('shopEliteProducts', JSON.stringify(updatedProducts));
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};