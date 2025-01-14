const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "A simple API documentation for Conductor Management System",
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Development server",
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter your JWT token in the format: Bearer <token>",
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

module.exports = swaggerDefinition;
