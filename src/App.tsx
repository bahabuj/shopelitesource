import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';
import AdminDashboard from './components/AdminDashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          firstName: firebaseUser.displayName?.split(' ')[0] || 'Elite',
          lastName: firebaseUser.displayName?.split(' ')[1] || 'Customer',
          createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
          isAdmin: firebaseUser.email === 'admin@shopelitesource.com',
          emailVerified: firebaseUser.emailVerified
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/*" element={
            user ? (
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
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;