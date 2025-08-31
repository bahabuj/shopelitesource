import React, { useState } from 'react';
import { User, Search, Heart, ShoppingBag, Menu, X, LogOut, Settings } from 'lucide-react';
import { InfoPageType } from '../types';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  cartItemCount: number;
  onCartToggle: () => void;
  onInfoPageSelect: (type: InfoPageType['type']) => void;
  onCategorySelect?: (category: string) => void;
  onScrollToProducts?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  cartItemCount, 
  onCartToggle,
  onInfoPageSelect,
  onCategorySelect,
  onScrollToProducts
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    if (onScrollToProducts) {
      onScrollToProducts();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/elite-logo.png" 
              alt="Elite Source" 
              className="h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleCategoryClick('new-arrivals')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              NEW ARRIVALS
            </button>
            <button 
              onClick={() => handleCategoryClick('women')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              WOMEN
            </button>
            <button 
              onClick={() => handleCategoryClick('men')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              MEN
            </button>
            <button 
              onClick={() => handleCategoryClick('kids')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              KIDS
            </button>
            <button 
              onClick={() => handleCategoryClick('accessories')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              ACCESSORIES
            </button>
            <button 
              onClick={() => handleCategoryClick('sale')}
              className="text-white hover:text-gold transition-colors duration-300 font-medium">
              SALE
            </button>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white hover:text-gold transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-white hover:text-gold transition-colors duration-300">
              <Heart className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onCartToggle}
              className="p-2 text-white hover:text-gold transition-colors duration-300 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-white hover:text-gold transition-colors duration-300"
              >
                <User className="w-5 h-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl">
                  <div className="p-4 border-b border-gray-700">
                    <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center space-x-2 p-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-gold transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  handleCategoryClick('new-arrivals');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                NEW ARRIVALS
              </button>
              <button 
                onClick={() => {
                  handleCategoryClick('women');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                WOMEN
              </button>
              <button 
                onClick={() => {
                  handleCategoryClick('men');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                MEN
              </button>
              <button 
                onClick={() => {
                  handleCategoryClick('kids');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                KIDS
              </button>
              <button 
                onClick={() => {
                  handleCategoryClick('accessories');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                ACCESSORIES
              </button>
              <button 
                onClick={() => {
                  handleCategoryClick('sale');
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-gold transition-colors duration-300 font-medium py-2 text-left"
              >
                SALE
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;