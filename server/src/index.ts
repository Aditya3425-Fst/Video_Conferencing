import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import { initializeFirebase, verifyIdToken } from './config/firebase';

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Authentication Middleware
// This middleware verifies the Firebase ID token from the client
export const firebaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
}); 

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Video Conferencing API Server' });
});

// Example protected route
app.get('/api/protected', firebaseAuthMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ 
    message: 'This is a protected route',
    user: {
      uid: user.uid,
      email: user.email,
    }
  });
});

// Connect to MongoDB and start server
const startServer = async (): Promise<void> => {
  try {
    // Initialize Firebase
    initializeFirebase();
    
    // Connect to MongoDB
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
