const express = require('express');
const Item = require('../models/item');
// routes/user.js

const router = express.Router();

/**
* @swagger
* components:
* schemas:
* items:
* type: object
* properties:
* name:
* type: string
* description: The user's name
* description:
* type: string
* description: Description of user
*/
/**
* @swagger
* /items:
* post:
* summary: Create a new user
* requestBody:
* required: true
* content:
* application/json:
* schema:
* $ref: '#/components/schemas/items'
* responses:
* 201:
* description: User created
*/
  router.post('/user', (req, res) => {
   const user = req.body;
   res.status(201).json(user);
});

module.exports = router;
// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
* @swagger
* /items:
* get:
* summary: Retrieve a list of users
* responses:
* 200:
* description: A list of users
*/
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
* @swagger
* /items:
* patch:
* summary: Update item
* responses:
* 200:
* description: Update item
*/
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
* @swagger
* /items:
* delete:
* summary: Delete an item
* responses:
* 200:
* description: Delete item
*/
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;