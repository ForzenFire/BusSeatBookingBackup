const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "A simple API documentation",
    },
    servers: [
        {
            url: "http://localhost:80",
            description: "Development server",
        },
    ],
};

module.exports = swaggerDefinition;