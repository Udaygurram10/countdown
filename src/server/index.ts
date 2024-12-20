import express from 'express';
import cors from 'cors';
import timerRoutes from './routes/timer';
import { logger } from '../utils/logger';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api', timerRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});