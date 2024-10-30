// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User & Company API",
      version: "1.0.0",
      description:
        "API documentation for managing users and companies, including admin functionalities",
    },
    servers: [
      {
        url: "http://localhost:4000", // Replace with your server's base URL if different
      },
    ],
    components: {
      securitySchemes: {
        tokenAuth: {
          // Renamed for clarity
          
         
          in: "header",
          name: "auth-token", // This should match the header name you use
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        Company: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            location: { type: "string" },
            employees: { type: "integer" },
          },
        },
      },
    },
    security: [
      {
        tokenAuth: [],
      },
    ],
  },
  apis: ["./routes/admin.js"],
};



const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
