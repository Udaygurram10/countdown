export const DEFAULT_CONFIG = {
  width: 400,
  height: 100,
  fontFamily: 'Arial',
  fontSize: 24,
  textColor: '#000000',
  backgroundColor: '#FFFFFF',
  backgroundOpacity: 0,
  format: 'DD:HH:MM:SS',
  expiryMessage: 'Expired'
} as const;

export const ANIMATION_CONFIG = {
  frameCount: 60,
  frameDelay: 1000,
  repeat: 0 // Loop forever
} as const;