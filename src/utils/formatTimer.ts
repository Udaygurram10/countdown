import { TimeRemaining } from '../types/timer';

export function formatTime(time: TimeRemaining, format: string = 'DD:HH:MM:SS'): string {
  if (!time || time.isExpired) return '';

  try {
    const formatMap: Record<string, string> = {
      'DD': time.days.toString().padStart(2, '0'),
      'HH': time.hours.toString().padStart(2, '0'),
      'MM': time.minutes.toString().padStart(2, '0'),
      'SS': time.seconds.toString().padStart(2, '0')
    };

    return format.replace(/DD|HH|MM|SS/g, match => formatMap[match] || match);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}