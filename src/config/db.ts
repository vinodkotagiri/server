import mongoose from 'mongoose';
import { LoggerService } from '../utils/Logger';

export class Database {
  private readonly logger: LoggerService;

  constructor(private readonly url: string, loggerService: LoggerService) {
    this.logger = loggerService;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url);
      this.logger.info('Database connected');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Database connection failed: ${message}`);
    }
  }
}
