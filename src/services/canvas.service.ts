import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { TimerConfig, TimerDimensions } from '../types/timer';
import { TimeRemaining } from '../utils/timeCalculator';
import { formatTime } from '../utils/formatTimer';

export class CanvasService {
  private readonly canvas: Canvas;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly dimensions: TimerDimensions;

  constructor(config: TimerConfig) {
    this.dimensions = {
      width: config.width!,
      height: config.height!,
      unitWidth: Math.floor(config.width! / 4),
      spacing: 10,
      padding: 20
    };

    this.canvas = createCanvas(this.dimensions.width, this.dimensions.height);
    this.ctx = this.canvas.getContext('2d');
  }

  public drawFrame(time: TimeRemaining, config: TimerConfig): void {
    this.drawBackground(config);
    this.drawTime(time, config);
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  private drawBackground(config: TimerConfig): void {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    
    if (config.backgroundOpacity! > 0) {
      this.ctx.fillStyle = config.backgroundColor!;
      this.ctx.globalAlpha = config.backgroundOpacity!;
      this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.ctx.globalAlpha = 1;
    }
  }

  private drawTime(time: TimeRemaining, config: TimerConfig): void {
    this.ctx.fillStyle = config.textColor!;
    this.ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const text = time.isExpired 
      ? config.expiryMessage 
      : formatTime(time, config.format);

    this.ctx.fillText(
      text,
      this.dimensions.width / 2,
      this.dimensions.height / 2
    );
  }
}