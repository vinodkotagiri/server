import express from "express";
import cors from "cors";
import config from "../config";
import routes from "./routes"; // Prefer import over require for TS
import swaggerUi from 'swagger-ui-express';
import { docs } from "../documentation"; '../documentation'

const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Enable CORS for all origins.
 */
app.use(cors());

/**
 * Register API routes under versioned path.
 * Example: /api/v1, /api/v2, etc.
 */
app.use(`/api/v${config.apiVersion}`, routes);

/**
 * Register Swagger UI for API documentation.
 */
app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(docs));

/** 
 * Register routes for handling client requests.
 */
app.use("/", routes);

export default app;
