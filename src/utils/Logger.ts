import { createLogger, format, transports, Logger } from 'winston';

/**
 * LoggerService is a wrapper around Winston that provides
 * structured and context-aware logging for application modules.
 */
export class LoggerService {
  private logger: Logger;

  /**
   * Creates an instance of LoggerService.
   *
   * @param context - A string representing the source of the logs (e.g., class or module name).
   */
  constructor(private context: string) {
    this.logger = createLogger({
      level: 'info', // Default log level
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds timestamps to logs
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
        })
      ),
      transports: [
        // Output logs to the console
        new transports.Console(),
        // Save error-level logs to error.log
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Save all logs to combined.log
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  /**
   * Logs an informational message.
   *
   * @param message - The message to log.
   */
  info(message: string): void {
    this.logger.info(message);
  }

  /**
   * Logs a warning message.
   *
   * @param message - The message to log.
   */
  warn(message: string): void {
    this.logger.warn(message);
  }

  /**
   * Logs an error message.
   *
   * @param message - The message to log.
   */
  error(message: string): void {
    this.logger.error(message);
  }

  /**
   * Logs a debug message.
   *
   * @param message - The message to log.
   */
  debug(message: string): void {
    this.logger.debug(message);
  }
}
