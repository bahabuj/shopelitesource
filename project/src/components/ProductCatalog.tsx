import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  isLoading: boolean;
  onProductSelect: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  isLoading,
  onProductSelect,
  wishlist,
  onToggleWishlist,
  selectedCategory: externalSelectedCategory,
  onCategoryChange
}) => {
  const [internalSelectedCategory, setInternalSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedCategory = externalSelectedCategory || internalSelectedCategory;

  const categories = [
    { id: 'all', name: 'ALL COLLECTIONS' },
    { id: 'new-arrivals', name: 'NEW ARRIVALS' },
    { id: 'women', name: 'WOMEN' },
    { id: 'men', name: 'MEN' },
    { id: 'kids', name: 'KIDS' },
    { id: 'accessories', name: 'ACCESSORIES' },
    { id: 'sale', name: 'SALE' }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const handleCategorySelect = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    } else {
      setInternalSelectedCategory(categoryId);
    }
    setIsFilterOpen(false);
  };

  return (
    <section id="products-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-wider">
            EXCLUSIVE COLLECTION
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Curated luxury pieces from the world's most prestigious fashion houses
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg text-white"
            >
              <Filter className="w-4 h-4" />
              <span>FILTER</span>
            </button>
            
            <div className={`${isFilterOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6`}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    handleCategorySelect(category.id);
                  }}
                  className={`px-6 py-2 font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-gray-400 font-medium">
            {filteredProducts.length} PIECE{filteredProducts.length !== 1 ? 'S' : ''}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded mb-3"></div>
                  <div className="h-8 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No Products Available</h3>
            <p className="text-gray-500">Check back soon for new arrivals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => onProductSelect(product)}
                isInWishlist={wishlist.includes(product.id)}
                onToggleWishlist={() => onToggleWishlist(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;