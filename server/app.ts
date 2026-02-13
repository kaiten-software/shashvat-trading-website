
import express from 'express';
import { registerRoutes } from './routes';
import path from 'path';

// Create and configure Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from uploads directory
// This is important for images to load
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Register API routes
registerRoutes(app);

export default app;
