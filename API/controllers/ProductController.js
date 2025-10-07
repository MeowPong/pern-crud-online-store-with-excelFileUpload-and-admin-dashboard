// Importing necessary modules
const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
const exceljs = require('exceljs');

dotenv.config(); // Load environment variables

// Middleware for handling file uploads
app.use(fileUpload());

// Create a new product
app.post("/create", async (req, res) => {
    try {
        await prisma.product.create({
            data: req.body,
        });
        res.send({ message: 'success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// List products with active status
app.get('/list', async (req, res) => {
    try {
        const data = await prisma.product.findMany({
            orderBy: { id: 'desc' },
            where: { status: 'use' }
        });
        res.send({ results: data });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Remove a product by marking its status as 'deleted'
app.delete('/remove/:id', async (req, res) => {
    try {
        await prisma.product.update({
            data: { status: 'delete' },
            where: { id: parseInt(req.params.id) }
        });
        res.send({ message: 'success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Update product details (including image replacement)
app.put('/update', async (req, res) => {
    try {
        const fs = require('fs');
        const oldData = await prisma.product.findFirst({
            where: { id: parseInt(req.body.id) }
        });

        // Remove old image from the server
        const imagePath = './uploads/' + oldData.img;
        if (oldData.img && fs.existsSync(imagePath)) {
            await fs.unlinkSync(imagePath);
        }

        await prisma.product.update({
            data: req.body,
            where: { id: parseInt(req.body.id) }
        });
        res.send({ message: 'success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Upload an image for the product
app.post('/upload', async (req, res) => {
    try {
        if (req.files && req.files.img) {
            const img = req.files.img;
            const fs = require('fs');
            const myDate = new Date();
            const newName = `${myDate.getFullYear()}${myDate.getMonth() + 1}${myDate.getDate()}${myDate.getHours()}${myDate.getMinutes()}${myDate.getSeconds()}${myDate.getMilliseconds()}.${img.name.split('.').pop()}`;

            img.mv('./uploads/' + newName, (err) => {
                if (err) throw err;
                res.send({ newName: newName });
            });
        } else {
            res.status(501).send('Not Implemented');
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Upload products from an Excel file
app.post('/uploadFromExcel', (req, res) => {
    try {
        const fileExcel = req.files.fileExcel;

        if (fileExcel) {
            fileExcel.mv('./uploads/' + fileExcel.name, async (err) => {
                if (err) throw err;

                // Read and insert product data from the Excel file
                const workbook = new exceljs.Workbook();
                await workbook.xlsx.readFile('./uploads/' + fileExcel.name);
                const ws = workbook.getWorksheet(1);

                for (let i = 2; i <= ws.rowCount; i++) {
                    const name = ws.getRow(i).getCell(1).value ?? "";
                    const cost = ws.getRow(i).getCell(2).value ?? 0;
                    const price = ws.getRow(i).getCell(3).value ?? 0;

                    if (name && cost >= 0 && price >= 0) {
                        await prisma.product.create({
                            data: { name, cost, price, img: '' }
                        });
                    }
                }

                // Remove the uploaded Excel file after processing
                const fs = require('fs');
                await fs.unlinkSync('./uploads/' + fileExcel.name);
                res.send({ message: 'success' });
            });
        } else {
            res.status(500).send({ message: 'File is missing or invalid' });
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

module.exports = app;
