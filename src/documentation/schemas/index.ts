export const schemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string", example: "user123" },
      name: { type: "string", example: "Vinod Kumar" },
      email: { type: "string", example: "vinod@example.com" },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "vinod@example.com" },
      password: { type: "string", format: "password", example: "StrongPass123" },
    },
  },

  SignupRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", example: "Vinod Kumar" },
      email: { type: "string", format: "email", example: "vinod@example.com" },
      password: { type: "string", format: "password", example: "StrongPass123" },
    },
  },

  TokenResponse: {
    type: "object",
    properties: {
      token: { type: "string", example: "jwt.token.here" },
      expiresIn: { type: "number", example: 3600 },
    },
  },
};
