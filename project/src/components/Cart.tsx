import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (id: string, size?: string, color?: string) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white">SHOPPING BAG</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Your bag is empty</h3>
                <p className="text-gray-500">Add some luxury pieces to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                            className="w-8 h-8 border border-gray-700 rounded-lg text-white hover:border-gold hover:text-gold transition-all duration-300"
                          >
                            <Minus className="w-4 h-4 mx-auto" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                            className="w-8 h-8 border border-gray-700 rounded-lg text-white hover:border-gold hover:text-gold transition-all duration-300"
                          >
                            <Plus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id, item.size, item.color)}
                          className="text-red-400 hover:text-red-300 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <p className="text-gold font-bold mt-2">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-white">TOTAL</span>
                <span className="text-2xl font-bold text-gold">
                  ${total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-[1.02]">
                  PROCEED TO CHECKOUT
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full border-2 border-gray-700 text-white font-bold py-4 rounded-xl hover:border-gold hover:text-gold transition-all duration-300"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;