import React, { useEffect } from 'react';
import { User } from '../types';

interface GoogleCallbackProps {
  onLogin: (user: User) => void;
}

const GoogleCallback: React.FC<GoogleCallbackProps> = ({ onLogin }) => {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      console.log('Google callback - Code:', code, 'Error:', error);
      if (error) {
        console.error('Google OAuth error:', error);
        alert('Google authentication was cancelled or failed. Redirecting back to login.');
        window.location.href = '/';
        return;
      }

      if (code) {
        try {
          console.log('Processing Google OAuth code...');
          
          // For now, simulate the Google user creation since we don't have Supabase set up
          // In production, this would call your backend/Supabase function
          const mockUser = {
            id: `google_${Date.now()}`,
            email: 'user@gmail.com', // This would come from Google
            firstName: 'Google',
            lastName: 'User',
            createdAt: new Date().toISOString(),
            isAdmin: false
          };
          
          console.log('Mock Google user created:', mockUser);
          onLogin(mockUser);
          
          // Clear the URL parameters
          window.history.replaceState({}, document.title, '/');
          
          /* 
          // Real implementation would be:
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code })
          });

          if (response.ok) {
            const { user } = await response.json();
            onLogin(user);
            window.history.replaceState({}, document.title, '/');
          } else {
            throw new Error('Failed to authenticate with Google');
          }
          */
        } catch (error) {
          console.error('Authentication error:', error);
          alert('Authentication failed. Please try again.');
          window.location.href = '/';
        }
      } else {
        console.log('No code found, redirecting to home');
        window.location.href = '/';
      }
    };

    handleGoogleCallback();
  }, [onLogin]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Authenticating with Google</h2>
        <p className="text-gray-400">Please wait while we complete your sign-in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;