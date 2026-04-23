const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// ১. CORS fix (Eti na thakle frontend theke order jabe na)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup (Image ba screenshot field handle korar jonno)
const upload = multer({ dest: 'uploads/' });

// ২. Home Route (Ekhon link-e dhukle "Not Found" dekhabe na)
app.get('/', (req, res) => {
    res.send('<h1>SORA Backend is Live!</h1><p>Server is running perfectly.</p>');
});

// ৩. Order Post Route (Eti order.html theke data receive korbe)
app.post('/place-order', upload.single('screenshot'), (req, res) => {
    try {
        const orderData = req.body;
        
        // Ekhane console-e order ta dekhabe (Render-er Logs tab-e paben)
        console.log("New Order Received:", orderData);

        // Success response pathachchi
        res.status(200).json({ 
            success: true, 
            message: "Order successfully received on server!" 
        });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server internal error" 
        });
    }
});

// Port settings
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});