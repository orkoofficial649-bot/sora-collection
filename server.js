const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Apnar HTML file gulo 'public' folder-e rakhun

// Upload folder create logic (jodi na thake)
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Main Order Route
app.post('/place-order', upload.single('screenshot'), (req, res) => {
    try {
        const orderInfo = req.body;
        const screenshotFile = req.file;

        // Terminal-e data dekhabe (Ekhane Database save logic hobe)
        console.log("--- New Order Received ---");
        console.log("Customer:", orderInfo.name);
        console.log("Phone:", orderInfo.phone);
        console.log("Address:", orderInfo.address);
        console.log("District:", orderInfo.district);
        console.log("Total Bill:", orderInfo.totalAmount);
        console.log("Payment Method:", orderInfo.payMethod);
        if (screenshotFile) {
            console.log("Screenshot Saved As:", screenshotFile.filename);
        }
        console.log("---------------------------");

        // Response pathano
        res.status(200).json({ success: true, message: "Order Success" });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`SORA Server is running on http://localhost:${PORT}`);
});