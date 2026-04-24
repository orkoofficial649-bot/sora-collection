const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.'))); // HTML ফাইলগুলো লোড করার জন্য

// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soracollection.help@gmail.com',
        pass: 'nczm obif euhh kypl' // আপনার দেওয়া অ্যাপ পাসওয়ার্ড
    }
});

// Order API Route
app.post('/order', (req, res) => {
    const { name, phone, address, product, total } = req.body;

    const mailOptions = {
        from: 'soracollection.help@gmail.com',
        to: 'soracollection.help@gmail.com', // আপনার নিজের ইমেইলে অর্ডার আসবে
        subject: `New Order from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #ec407a;">New Order Received!</h2>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Product Details:</strong> ${product}</p>
                <h3 style="color: #880e4f;">Total Amount: ${total} TK</h3>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Error sending email" });
        }
        res.json({ success: true, message: "Order placed successfully" });
    });
});

// Root Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});