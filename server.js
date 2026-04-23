const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soracollection.help@gmail.com',
        pass: 'detcvwtoocvclqsz' // আপনার দেওয়া অ্যাপ পাসওয়ার্ড
    }
});

// Order Submission Endpoint
app.post('/place-order', (req, res) => {
    const { name, phone, address, district, thana, productName, productPrice, deliveryCharge, totalAmount, payMethod, senderNum } = req.body;

    const mailOptions = {
        from: `"SORA Collection" <soracollection.help@gmail.com>`,
        to: 'soracollection.help@gmail.com',
        subject: `New Order: ${productName} by ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #f06292; padding: 20px; border-radius: 10px;">
                <h2 style="color: #d81b60; border-bottom: 2px solid #f06292; padding-bottom: 10px;">New Order Received!</h2>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Full Address:</strong> ${address}, ${thana}, ${district}</p>
                <hr>
                <p><strong>Product Name:</strong> ${productName}</p>
                <p><strong>Product Price:</strong> ${productPrice} TK</p>
                <p><strong>Delivery Charge:</strong> ${deliveryCharge} TK</p>
                <h3 style="color: #4a148c;">Total Amount: ${totalAmount} TK</h3>
                <hr>
                <p><strong>Payment Method:</strong> ${payMethod.toUpperCase()}</p>
                <p><strong>Sender Number:</strong> ${senderNum}</p>
                <p style="font-size: 12px; color: #777; margin-top: 20px;">Order generated from SORA Collection Website</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Mail Error:', error);
            return res.status(500).json({ success: false, message: 'ইমেইল পাঠানো সম্ভব হয়নি' });
        }
        res.json({ success: true, message: 'অর্ডার সফল হয়েছে' });
    });
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'order.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});