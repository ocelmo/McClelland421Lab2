#Order System API

This web app project is an online ordering system built with Node.js and Express. It interacts with a MongoDB database. The included functions let users add and delete items, customers, and orders. Another endpoint also accounts for customer payment information.

## Installation Instructions

1. clone the reposiotory from https://github.com/ocelmo/McClelland421Lab2
2. change the directory to order-system-api
3. install dependencies with npm install
4. set up enviornment with MONGO_URI=mongodb://localhost/mydatabase
    PORT=3000
5. run the server with npm start

## Using the API EndPoints
1. Create a new item
    POST/items
    Body: 
    {
        "name": "Crayons",
        "price": 1.99,
        "description": "24-pack of colored crayons."
    }

2. Update an item
    PATCH/items/:id
    Body:
    {
        "price": 12.34
    }

3. Delete an item
   DELETE/items/:id

4. Get an item
    GET/items/:id

5. Create a customer
    POST/customers
    Body: 
    {
        "name": "First Last"
    }

6. Create an order
    POST/orders
    Body:
    {
        "customerId": "customer_id",
  "items": [
    {
      "itemId": "item_id",
      "quantity": 2
    }
  ]
    }

7. Cancel an order
    DELETE/orders/:id

8. Submit a payment
    POST/payments
    Body: 
    {
    "orderId": "order_id",
    "amount": 21.98,
    "paymentMethod": "credit_card"
    }

## Testing Instructions
1. open Postman and import the colection file from the repository
2. validate the API endpoints with Postman's tools