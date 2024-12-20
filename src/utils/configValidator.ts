import { TimerConfig, TimerConfigSchema } from '../types/timer';
import { DEFAULT_CONFIG } from '../config/timer.config';

export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

export function validateConfig(config: TimerConfig): TimerConfig {
  try {
    const validatedConfig = TimerConfigSchema.parse(config);
    return {
      ...DEFAULT_CONFIG,
      ...validatedConfig
    };
  } catch (error) {
    throw new ConfigValidationError(`Invalid timer configuration: ${error.message}`);
  }
}