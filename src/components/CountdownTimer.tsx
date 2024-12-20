import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/timeCalculator';
import { formatTime } from '../utils/formatTimer';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnit = (value: number, label: string) => (
    <div className="flex flex-col items-center mx-2">
      <div className="text-4xl font-bold">{value.toString().padStart(2, '0')}</div>
      <div className="text-sm uppercase">{label}</div>
    </div>
  );

  return (
    <div className={`flex justify-center items-center p-4 rounded-lg ${className}`}>
      {timeUnit(timeLeft.days, 'Days')}
      {timeUnit(timeLeft.hours, 'Hours')}
      {timeUnit(timeLeft.minutes, 'Minutes')}
      {timeUnit(timeLeft.seconds, 'Seconds')}
    </div>
  );
};