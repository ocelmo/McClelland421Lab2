const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/mydatabase';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

// Additional Routes (if needed)
app.post('/customers', (req, res) => {
  // Code to create a customer
  res.send('Customer created');
});

app.post('/orders', (req, res) => {
  // Code to create an order
  res.send('Order created');
});

app.delete('/orders/:id', (req, res) => {
  // Code to cancel an order
  res.send('Order canceled');
});

app.post('/payments', (req, res) => {
  // Code to submit payment
  res.send('Payment submitted');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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
    apis: ['./index.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Add this line to serve Swagger UI

const itemsRoutes = require('./routes/items');
app.use('/api', itemsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
