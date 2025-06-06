import { schemas } from "../schemas";

export const userPaths = {
  "/users": {
    get: {
      tags: ["User"],
      summary: "Get all users",
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: schemas.User,
              },
            },
          },
        },
      },
    },
  },
};
