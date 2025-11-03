import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './models';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Task Management API running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
