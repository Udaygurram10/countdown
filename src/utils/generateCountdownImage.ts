import { createCanvas, registerFont } from 'canvas';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function generateCountdownImage(targetDate: Date): Buffer {
  const now = new Date();
  
  const days = differenceInDays(targetDate, now);
  const hours = differenceInHours(targetDate, now) % 24;
  const minutes = differenceInMinutes(targetDate, now) % 60;
  const seconds = differenceInSeconds(targetDate, now) % 60;

  // Create canvas
  const canvas = createCanvas(400, 100);
  const ctx = canvas.getContext('2d');

  // Set transparent background
  ctx.clearRect(0, 0, 400, 100);

  // Configure text
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw countdown
  const text = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  ctx.fillText(text, 200, 50);

  // Convert to buffer
  return canvas.toBuffer('image/png');
}