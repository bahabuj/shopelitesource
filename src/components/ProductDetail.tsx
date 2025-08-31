import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, Heart, ShoppingBag, Star, MessageCircle, User } from 'lucide-react';
import ReviewSection from './ReviewSection';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  isInWishlist,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Navy', 'Burgundy'];

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
  };

  const handleWhatsAppRequest = () => {
    const message = `Hi! I'm interested in this product from Elite Source:

Product: ${product.name}
Price: $${product.price.toLocaleString()}
Category: ${product.category.toUpperCase()}

Could you please provide more information about this item?

Product Image: ${product.image}`;

    const whatsappUrl = `https://wa.me/17136890528?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex flex-col">
                  {product.isPromo && product.originalPrice ? (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-3xl font-bold text-red-400">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full mt-2 inline-block w-fit">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF SALE
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gold">
                      ${product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${
                      i < Math.floor(product.reviews?.reduce((acc, review) => acc + review.rating, 0) / (product.reviews?.length || 1) || 5)
                        ? 'fill-gold text-gold' 
                        : 'text-gray-600'
                    }`} />
                  ))}
                  <span className="text-gray-400 ml-2">
                    ({product.reviews?.length || 0} review{product.reviews?.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.detailedDescription || product.description}
                {!product.detailedDescription && '. Crafted with the finest materials and attention to detail, this piece represents the pinnacle of luxury fashion. Each item is carefully selected to ensure the highest quality and timeless elegance.'}
              </p>
              
              {product.brand && (
                <div className="mt-4">
                  <span className="text-sm text-gray-400">Brand: </span>
                  <span className="text-white font-medium">{product.brand}</span>
                </div>
              )}
              
              {product.sku && (
                <div className="mt-2">
                  <span className="text-sm text-gray-400">SKU: </span>
                  <span className="text-white font-mono">{product.sku}</span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-bold mb-4">SIZE</h3>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-black'
                        : 'border-gray-700 text-gray-300 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-bold mb-4">COLOR</h3>
              <div className="flex space-x-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border rounded-lg font-medium transition-all duration-300 ${
                      selectedColor === color
                        ? 'border-gold bg-gold text-black'
                        : 'border-gray-700 text-gray-300 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-bold mb-4">QUANTITY</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-12 h-12 border border-gray-700 rounded-lg text-white hover:border-gold hover:text-gold transition-all duration-300 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-xl font-bold text-white w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-gray-700 rounded-lg text-white hover:border-gold hover:text-gold transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>
              
              <button
                onClick={handleWhatsAppRequest}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>REQUEST ON WHATSAPP</span>
              </button>
              
              <button
                onClick={onToggleWishlist}
                className={`w-full border-2 font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 ${
                  isInWishlist
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gray-700 text-white hover:border-gold hover:text-gold'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                <span>{isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}</span>
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-800 pt-8">
              <div className="space-y-6">
                {product.specifications && product.specifications.length > 0 && (
                  <div>
                    <h4 className="text-white font-bold mb-3">SPECIFICATIONS</h4>
                    <ul className="text-gray-400 space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {product.materials && (
                  <div>
                    <h4 className="text-white font-bold mb-3">MATERIALS</h4>
                    <p className="text-gray-400">{product.materials}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="text-white font-bold mb-2">DETAILS</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>Premium materials</li>
                      <li>Handcrafted construction</li>
                      <li>Limited edition</li>
                      <li>Comes with authenticity certificate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">CARE</h4>
                    {product.careInstructions ? (
                      <p className="text-gray-400">{product.careInstructions}</p>
                    ) : (
                      <ul className="text-gray-400 space-y-1">
                        <li>Professional dry clean only</li>
                        <li>Store in dust bag</li>
                        <li>Keep away from direct sunlight</li>
                        <li>Handle with care</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-16">
            <ReviewSection 
              reviews={product.reviews || []}
              productId={product.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;