import mongoose from "mongoose";
import { LoggerService } from "../utils/Logger";

/**
 * Database class to manage MongoDB connection using Mongoose.
 * It encapsulates the connection logic and logs relevant events.
 */
export class Database {
  private readonly logger: LoggerService;

  /**
   * Creates an instance of the Database class.
   * 
   * @param url - MongoDB connection URI (e.g., 'mongodb://localhost:27017/dbname')
   * @param loggerService - An instance of LoggerService for logging events
   */
  constructor(private readonly url: string, loggerService: LoggerService) {
    this.logger = loggerService;
  }

  /**
   * Establishes a connection to the MongoDB server.
   * Logs success or failure messages using the provided LoggerService.
   * 
   * @returns Promise<void>
   */
  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url);
      this.logger.info("Database connected");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Database connection failed: ${message}`);
    }
  }
}
