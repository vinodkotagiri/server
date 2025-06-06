import { schemas } from "../schemas";

export const authPaths = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "User signup",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: schemas.SignupRequest,
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: schemas.User,
            },
          },
        },
        "400": { description: "Invalid input" },
      },
    },
  },

  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "User login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: schemas.LoginRequest,
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful, returns JWT token",
          content: {
            "application/json": {
              schema: schemas.TokenResponse,
            },
          },
        },
        "401": { description: "Invalid credentials" },
      },
    },
  },
};
