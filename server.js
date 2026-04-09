const express = require('express');
const cors = require('cors');
const fs = require('fs'); // File system data save korar jonno

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = './products.json';

// Local file theke data porar logic
const getProducts = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Local file-e data save korar logic
const saveProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// --- ROUTES ---

// 1. Sob Product dekha (GET)
app.get('/api/products', (req, res) => {
    const products = getProducts();
    res.json(products);
});

// 2. Notun Product Add kora (POST)
app.post('/api/products', (req, res) => {
    const products = getProducts();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

app.get('/', (req, res) => res.send("SORA Backend (Local Mode) is Live!"));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 SORA Backend (Local) is running on port ${PORT}`);
    console.log(`🔗 Preview: http://localhost:${PORT}`);
});