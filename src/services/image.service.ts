import GIFEncoder from 'gifencoder';
import { TimerConfig } from '../types/timer';
import { CanvasService } from './canvas.service';
import { calculateTimeRemaining } from '../utils/timeCalculator';
import { ANIMATION_CONFIG } from '../config/timer.config';
import { validateConfig } from '../utils/configValidator';

export class ImageService {
  private readonly canvasService: CanvasService;
  private readonly config: TimerConfig;

  constructor(config: TimerConfig) {
    this.config = validateConfig(config);
    this.canvasService = new CanvasService(this.config);
  }

  public generateStaticImage(): Buffer {
    const time = calculateTimeRemaining(this.config.targetDate, this.config.timezone);
    this.canvasService.drawFrame(time, this.config);
    return this.canvasService.getCanvas().toBuffer('image/png');
  }

  public generateAnimatedImage(): Buffer {
    const encoder = new GIFEncoder(this.config.width!, this.config.height!);
    encoder.start();
    encoder.setRepeat(ANIMATION_CONFIG.repeat);
    encoder.setDelay(ANIMATION_CONFIG.frameDelay);
    encoder.setTransparent(true);

    for (let i = 0; i < ANIMATION_CONFIG.frameCount; i++) {
      const futureDate = new Date(Date.now() + i * ANIMATION_CONFIG.frameDelay);
      const time = calculateTimeRemaining(this.config.targetDate, this.config.timezone);
      
      this.canvasService.drawFrame(time, this.config);
      encoder.addFrame(this.canvasService.getCanvas().getContext('2d'));
    }

    encoder.finish();
    return encoder.out.getData();
  }
}