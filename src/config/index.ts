import { config } from "dotenv";

// Load environment variables from .env file into process.env
config();

/**
 * Application-wide configuration object.
 * Loaded from environment variables using dotenv.
 */
export default {
  /**
   * The version of the API.
   * Defaults to 1 if not specified in the environment.
   */
  apiVersion:1,

  /**
   * The port on which the server will run.
   * Defaults to 3000 if not specified in the environment.
   */
  port: process.env.PORT || 3000,

  /**
   * The MongoDB connection URI.
   * Defaults to 'mongodb://localhost:27017' if not specified.
   */
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',

  /**
   * The secret key used to sign and verify JWTs.
   * Must be defined in the environment for secure authentication.
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * A global admin secret used for privileged access or admin bootstrapping.
   * Should be stored securely in the environment.
   */
  globalAdminSecret: process.env.GLOBAL_ADMIN_SECRET
};
