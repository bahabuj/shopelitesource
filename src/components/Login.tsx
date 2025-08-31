import { signInWithPopup } from "firebase/auth";
import { User } from "../types";
import { auth, provider } from "../config/firebase";

// Set authorization scopes for Google sign-in
provider.addScope('email');
provider.addScope('profile');
provider.setCustomParameters({
  prompt: 'select_account'
});

interface LoginProps {
  onLogin?: (user: User) => void;
}

function Login({ onLogin }: LoginProps) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (onLogin) {
        const firebaseUser = result.user;
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          firstName: firebaseUser.displayName?.split(' ')[0] || 'Elite',
          lastName: firebaseUser.displayName?.split(' ')[1] || 'Customer',
          createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
          isAdmin: firebaseUser.email === 'admin@shopelitesource.com',
          emailVerified: firebaseUser.emailVerified
        };
        onLogin(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="h-5 w-5"
      />
      Continue with Google
    </button>
  );
}

export default Login;