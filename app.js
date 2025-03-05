const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

app.use(express.json()); // Add this line to parse JSON requests

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Add this line to serve Swagger UI

const itemsRoutes = require('./routes/items');
app.use('/api', itemsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
