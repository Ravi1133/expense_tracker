import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { updateCategories } from "../controllers/categories";
console.log("swagger.ts file loaded ✅");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for Expense Tracker",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  console.log("Swagger setup function called ✅");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
console.log(updateCategories,"updateCategories")
