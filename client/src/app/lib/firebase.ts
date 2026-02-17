import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration - Replace with your actual Firebase config
// Get your config from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * signInWithGoogle - Sign in with Google popup
 * @returns Promise<User | null> - The signed in user or null if failed
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful:', result.user.displayName);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    return null;
  }
};

/**
 * signInWithGitHub - Sign in with GitHub popup
 * @returns Promise<User | null> - The signed in user or null if failed
 */
export const signInWithGitHub = async (): Promise<User | null> => {
  try {
    const githubProvider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, githubProvider);
    console.log('GitHub sign-in successful:', result.user.displayName);
    return result.user;
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    return null;
  }
};

/**
 * logout - Sign out the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('Sign-out successful');
  } catch (error) {
    console.error('Sign-out error:', error);
  }
};

/**
 * signUpWithEmail - Create a new account with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<User | null> - The created user or null if failed
 */
export const signUpWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Sign-up successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error('Sign-up error:', error);
    // Handle specific error codes
    if (error.code === 'auth/email-already-in-use') {
      console.log('Email already in use');
    }
    return null;
  }
};

/**
 * signInWithEmail - Sign in with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<User | null> - The signed in user or null if failed
 */
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('Sign-in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error('Sign-in error:', error);
    // Handle specific error codes
    if (error.code === 'auth/invalid-email') {
      console.log('Invalid email');
    } else if (error.code === 'auth/invalid-credentials') {
      console.log('Invalid credentials');
    } else if (error.code === 'auth/user-not-found') {
      console.log('User not found');
    } else if (error.code === 'auth/wrong-password') {
      console.log('Wrong password');
    }
    return null;
  }
};

/**
 * onAuthChange - Listen to authentication state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
export default app;
