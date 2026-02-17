import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
}); 

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Video Conferencing API Server' });
});

// Connect to MongoDB and start server
const startServer = async (): Promise<void> => {
  try {
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
