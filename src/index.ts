import {config as dotenv} from 'dotenv'
dotenv();
import { createServer } from "http";
import config from "./config";
import app from "./app/app";
import { LoggerService } from "./utils/Logger";

/**
 * Logger instance for the Server context.
 */
const logger = new LoggerService("Server");

/**
 * Creates an HTTP server using the Express app.
 */
const server = createServer(app);

/**
 * Starts the server and listens on the configured port.
 * Logs a message when the server is successfully running.
 */
server.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
