import React, { useRef, useEffect, useCallback } from 'react';
import { TimerConfig } from '../types/timer';
import { calculateTimeRemaining } from '../utils/timeCalculator';
import { formatTime } from '../utils/formatTimer';

interface CountdownPreviewProps {
  config: TimerConfig;
}

export const CountdownPreview: React.FC<CountdownPreviewProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, config.width!, config.height!);

    // Draw background
    if (config.backgroundOpacity! > 0) {
      ctx.fillStyle = config.backgroundColor!;
      ctx.globalAlpha = config.backgroundOpacity!;
      ctx.fillRect(0, 0, config.width!, config.height!);
      ctx.globalAlpha = 1;
    }

    // Calculate time
    const time = calculateTimeRemaining(config.targetDate);

    // Draw text
    ctx.fillStyle = config.textColor!;
    ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = time.isExpired 
      ? config.expiryMessage 
      : formatTime(time, config.format);

    ctx.fillText(
      text,
      config.width! / 2,
      config.height! / 2
    );
  }, [config]);

  useEffect(() => {
    const animate = () => {
      drawFrame();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      width={config.width}
      height={config.height}
      className="w-full h-auto border rounded"
    />
  );
};