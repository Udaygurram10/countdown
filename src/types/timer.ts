export interface TimerConfig {
  targetDate: Date;
  timezone?: string;
  format?: string;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  width?: number;
  height?: number;
  expiryMessage?: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}