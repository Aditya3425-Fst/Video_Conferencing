import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// Firebase service account configuration
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'zyntrameet',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk@zyntrameet.iam.gserviceaccount.com',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
};

// Initialize Firebase Admin SDK
let firebaseAdmin: admin.app.App;

export const initializeFirebase = (): admin.app.App => {
  if (!admin.apps.length) {
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully');
  } else {
    firebaseAdmin = admin.apps[0]!;
  }
  return firebaseAdmin;
};

// Get Firebase Auth instance
export const getFirebaseAuth = (): admin.auth.Auth => {
  if (!firebaseAdmin) {
    initializeFirebase();
  }
  return firebaseAdmin.auth();
};

// Verify ID token from client
export const verifyIdToken = async (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  if (!firebaseAdmin) {
    initializeFirebase();
  }
  return firebaseAdmin.auth().verifyIdToken(idToken);
};

export default admin;
