import { createCanvas, registerFont, Canvas } from 'canvas';
import GIFEncoder from 'gifencoder';
import { TimerConfig, TimerDimensions } from '../types/timer';
import { calculateTimeRemaining, TimeRemaining } from '../utils/timeCalculator';
import { formatTime } from '../utils/formatTimer';

export class ImageGenerator {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private config: TimerConfig;
  private dimensions: TimerDimensions;

  constructor(config: TimerConfig) {
    this.config = {
      width: 400,
      height: 100,
      fontFamily: 'Arial',
      fontSize: 24,
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      backgroundOpacity: 0,
      format: 'DD:HH:MM:SS',
      expiryMessage: 'Expired',
      ...config
    };

    this.dimensions = {
      width: this.config.width!,
      height: this.config.height!,
      unitWidth: Math.floor(this.config.width! / 4),
      spacing: 10,
      padding: 20
    };

    this.canvas = createCanvas(this.dimensions.width, this.dimensions.height);
    this.ctx = this.canvas.getContext('2d');
  }

  private drawBackground(): void {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    
    if (this.config.backgroundOpacity! > 0) {
      this.ctx.fillStyle = this.config.backgroundColor!;
      this.ctx.globalAlpha = this.config.backgroundOpacity!;
      this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.ctx.globalAlpha = 1;
    }
  }

  private drawTime(time: TimeRemaining): void {
    this.ctx.fillStyle = this.config.textColor!;
    this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const text = time.isExpired 
      ? this.config.expiryMessage 
      : formatTime(time, this.config.format);

    this.ctx.fillText(
      text,
      this.dimensions.width / 2,
      this.dimensions.height / 2
    );
  }

  public generateStaticImage(): Buffer {
    const time = calculateTimeRemaining(this.config.targetDate, this.config.timezone);
    
    this.drawBackground();
    this.drawTime(time);
    
    return this.canvas.toBuffer('image/png');
  }

  public generateAnimatedImage(): Buffer {
    const encoder = new GIFEncoder(this.dimensions.width, this.dimensions.height);
    encoder.start();
    encoder.setRepeat(0); // Loop forever
    encoder.setDelay(1000); // 1 second delay
    encoder.setTransparent(true);

    // Generate 60 frames (1 minute of animation)
    for (let i = 0; i < 60; i++) {
      const futureDate = new Date(Date.now() + i * 1000);
      const time = calculateTimeRemaining(this.config.targetDate, this.config.timezone);
      
      this.drawBackground();
      this.drawTime(time);
      
      encoder.addFrame(this.ctx);
    }

    encoder.finish();
    return encoder.out.getData();
  }
}