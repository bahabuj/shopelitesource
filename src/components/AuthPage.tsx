import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Lock, Mail, User as UserIcon, Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Luxury fashion background images
  const backgroundImages = [
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for admin credentials
    const isAdminLogin = formData.email === 'admin@shopelitesource.com' && formData.password === 'admin123';
    
    if (isLogin) {
      // Login flow - check if user exists and is verified
      setTimeout(() => {
        const userData: User = isAdminLogin ? {
          id: 'admin-001',
          email: formData.email,
          firstName: 'Admin',
          lastName: 'User',
          createdAt: new Date().toISOString(),
          isAdmin: true,
          emailVerified: true
        } : {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          firstName: 'Elite',
          lastName: 'Customer',
          createdAt: new Date().toISOString(),
          isAdmin: false,
          emailVerified: true
        };
        onLogin(userData);
        setIsLoading(false);
      }, 1500);
    } else {
      // Sign up flow - direct registration
      setTimeout(() => {
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          firstName: formData.firstName || 'Elite',
          lastName: formData.lastName || 'Customer',
          createdAt: new Date().toISOString(),
          isAdmin: false,
          emailVerified: true
        };
        
        onLogin(userData);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    const redirectUri = 'https://shopeliteresource.com/api/auth/google/callback';
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
      client_id: '55706393904-nop51cvk14ptbkdsv4rc0ducfvetq08n.apps.googleusercontent.com',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'select_account'
    });
    
    console.log('Redirecting to Google OAuth:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
          </div>
        ))}
      </div>

      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Sliding Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-gold scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Auth Form */}
        <div className="bg-black/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-2xl animate-slide-up">
          <div className="flex justify-center mb-6">
            <img src="/elite_logo_.png" alt="Elite Source Logo" className="h-16 w-auto" />
          </div>
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                isLogin 
                  ? 'text-gold border-b-2 border-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'text-gold border-b-2 border-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Google Sign In */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required={!isLogin}
                  />
                </div>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-gray-600 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black font-bold py-4 rounded-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Please Wait...</span>
                </div>
              ) : (
                isLogin ? 'ENTER SHOP ELITE SOURCE' : 'JOIN SHOP ELITE SOURCE'
              )}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <a href="#" className="text-gold hover:text-yellow-400 text-sm transition-colors">
                Forgot your password?
              </a>
            </div>
          )}

        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm drop-shadow">
            By continuing, you agree to our{' '}
            <a href="#" className="text-gold hover:text-yellow-400 transition-colors">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-gold hover:text-yellow-400 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;