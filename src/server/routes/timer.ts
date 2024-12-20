import express from 'express';
import { TimerConfig } from '../../types/timer';
import { ImageService } from '../../services/image.service';
import { logger } from '../../utils/logger';

const router = express.Router();

router.get('/countdown', (req, res) => {
  try {
    const config: TimerConfig = {
      targetDate: new Date(req.query.target as string),
      timezone: req.query.timezone as string,
      format: req.query.format as string,
      fontFamily: req.query.fontFamily as string,
      fontSize: parseInt(req.query.fontSize as string),
      textColor: req.query.textColor as string,
      backgroundColor: req.query.backgroundColor as string,
      backgroundOpacity: parseFloat(req.query.backgroundOpacity as string),
      width: parseInt(req.query.width as string),
      height: parseInt(req.query.height as string),
      expiryMessage: req.query.expiryMessage as string
    };

    const imageService = new ImageService(config);
    const userAgent = req.headers['user-agent']?.toLowerCase() || '';
    
    const supportsAnimation = !userAgent.includes('outlook') && 
                            !userAgent.includes('windows mail');

    if (supportsAnimation) {
      const gifBuffer = imageService.generateAnimatedImage();
      res.setHeader('Content-Type', 'image/gif');
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
      res.send(gifBuffer);
    } else {
      const pngBuffer = imageService.generateStaticImage();
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-store, must-revalidate');
      res.send(pngBuffer);
    }
  } catch (error) {
    logger.error('Error generating countdown image:', error);
    res.status(400).json({ 
      error: 'Invalid parameters',
      message: error.message 
    });
  }
});

export default router;