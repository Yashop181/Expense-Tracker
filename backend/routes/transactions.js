const express = require('express');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Authentication middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied: Invalid Token Format');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

// Create a new transaction
router.post('/', authenticate, async (req, res) => {
    const { type, amount, category } = req.body;
    try {
        const transaction = new Transaction({ userId: req.user.id, type, amount, category });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all transactions for the authenticated user
router.get('/', authenticate, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a transaction by ID
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { type, amount, category } = req.body;
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { type, amount, category },
            { new: true }
        );
        if (!transaction) return res.status(404).send('Transaction not found');
        res.json(transaction);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a transaction by ID
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!transaction) return res.status(404).send('Transaction not found');
        res.send('Transaction deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
