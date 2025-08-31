import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';
import AdminDashboard from './components/AdminDashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('shopEliteUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shopEliteUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shopEliteUser');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {user ? (
        user.isAdmin ? (
          <AdminDashboard 
            user={user} 
            onLogout={handleLogout}
          />
        ) : (
          <MainApp 
            user={user} 
            onLogout={handleLogout}
          />
        )
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;