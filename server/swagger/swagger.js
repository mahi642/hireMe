// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// In swagger.js
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User & Company API",
      version: "1.0.0",
      description: "API documentation for managing users and companies",
    },
    servers: [
      {
        url: "http://localhost:4000", // Replace with your server's base URL
      },
    ],
  },
  apis: ["../controllers/*.js"], // Update this path to your controllers if needed
};
const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
