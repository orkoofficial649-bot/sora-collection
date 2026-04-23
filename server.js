const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// ১. CORS enable korun (Eti na thakle data jabe na)
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multer setup (jodi image thake)
const upload = multer({ dest: 'uploads/' });

// ২. Route thik korun (Apnar error-e 404 ashche karon hoyto '/place-order' lekha nei)
app.post('/place-order', upload.single('screenshot'), (req, res) => {
    try {
        const orderData = req.body;
        console.log("New Order Received:", orderData);

        // Ekhane apnar database ba telegram notification er code hobe

        res.status(200).json({ success: true, message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Server check korar jonno
app.get('/', (req, res) => {
    res.send('SORA Backend is running properly!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});