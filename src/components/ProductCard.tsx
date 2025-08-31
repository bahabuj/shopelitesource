import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isInWishlist,
  onToggleWishlist
}) => {
  const handleWhatsAppRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello, I want to request a product from Elite Source: ${product.name} - $${product.price.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/17136890528?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 cursor-pointer"
      onClick={onSelect}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-black font-bold text-sm">VIEW DETAILS</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isInWishlist
                ? 'bg-gold/90 border-gold text-black'
                : 'bg-black/50 border-gray-600 text-white hover:bg-gold/90 hover:border-gold hover:text-black'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleWhatsAppRequest}
            className="p-3 rounded-full bg-green-600 border border-green-500 text-white hover:bg-green-500 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            FEATURED
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.isPromo && product.originalPrice ? (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-red-400">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-1 rounded mt-1">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gold">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>
          
          <button
            onClick={handleWhatsAppRequest}
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>REQUEST NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;