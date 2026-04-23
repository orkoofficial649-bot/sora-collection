const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();

// ১. Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ২. File Upload Setup (Screenshot handle korar jonno)
const upload = multer({ dest: 'uploads/' });

// ৩. Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'orkoofficial649@gmail.com', // Apnar email
        pass: 'kxtuvepefjfmpztp'            // Apnar deya App Password
    }
});

// ৪. Home Route (Server check korar jonno)
app.get('/', (req, res) => {
    res.send('<h1>SORA Backend is Live!</h1><p>Server is running perfectly.</p>');
});

// ৫. Order Post Route (Email notification shoho)
app.post('/place-order', upload.single('screenshot'), async (req, res) => {
    try {
        const { name, phone, address, district, thana, productName, totalAmount, payMethod, senderNum } = req.body;
        
        console.log("New Order Received:", req.body);

        // Email-er bishoybostu
        const mailOptions = {
            from: 'SORA Collection <orkoofficial649@gmail.com>',
            to: 'orkoofficial649@gmail.com', 
            subject: `New Order: ${productName} - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ffcada; border-radius: 10px;">
                    <h2 style="color: #ec407a;">🛍️ New Order Received!</h2>
                    <p><strong>Customer Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Address:</strong> ${address}, ${thana}, ${district}</p>
                    <hr style="border: 0.5px solid #eee;">
                    <p><strong>Product:</strong> ${productName}</p>
                    <p><strong>Total Amount:</strong> ${totalAmount} TK</p>
                    <hr style="border: 0.5px solid #eee;">
                    <p><strong>Payment Method:</strong> ${payMethod}</p>
                    <p><strong>Sender Number:</strong> ${senderNum}</p>
                    <p style="font-size: 12px; color: #888; margin-top: 20px;">SORA Collection Order Management System</p>
                </div>
            `
        };

        // Email pathano
        await transporter.sendMail(mailOptions);
        console.log("Order email sent to orkoofficial649@gmail.com");

        res.status(200).json({
            success: true,
            message: "Order placed successfully!"
        });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again."
        });
    }
});

// ৬. Port Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});