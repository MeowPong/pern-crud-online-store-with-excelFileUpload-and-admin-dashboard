// Importing necessary modules
const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Middleware to check if user is signed in using JWT
function checkSingIn(req, res, next) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);

        if (result) {
            next();
        }
    } catch (e) {
        res.status(500).send({error: e.message});
    }
}

// Helper function to extract user ID from JWT
function getUserId(req, res) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);

        if (result) {
            return result.id;
        }
    } catch (e) {
        res.status(500).send({error: e.message});
    }
}

// Endpoint to sign in user and generate a token
app.post('/signIn', async (req, res) => {
    try {
        if (!req.body.user || !req.body.pass) {
            return res.status(401).send('unauthorized');
        }

        const user = await prisma.user.findFirst({
            where: {
                user: req.body.user,
                pass: req.body.pass,
                status: 'use'
            }
        });

        if (user) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '30d' });
            return res.send({ token });
        }

        res.status(401).send({ message: 'unauthorized' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Endpoint to get user info after successful sign-in
app.get('/info', checkSingIn, async (req, res) => {
    try {
        const userId = getUserId(req, res);
        const user = await prisma.user.findFirst({
            where: { id: userId },
            select: { name: true }
        });
        res.send({ result: user });
    } catch (e) {
        res.status(500).send({error: e.message});
    }
});

module.exports = app;
