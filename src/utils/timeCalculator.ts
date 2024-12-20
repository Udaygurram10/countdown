import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { TimeRemaining } from '../types/timer';

export function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();

  // Ensure dates are valid
  if (!targetDate || !(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    throw new Error('Invalid target date');
  }

  if (targetDate <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  try {
    return {
      days: Math.max(0, differenceInDays(targetDate, now)),
      hours: Math.max(0, differenceInHours(targetDate, now) % 24),
      minutes: Math.max(0, differenceInMinutes(targetDate, now) % 60),
      seconds: Math.max(0, differenceInSeconds(targetDate, now) % 60),
      isExpired: false
    };
  } catch (error) {
    console.error('Error calculating time remaining:', error);
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
}