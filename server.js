const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Shob static file (HTML, CSS, Image) current folder theke load hobe
app.use(express.static(path.join(__dirname, '.')));

// Main link-e (/) click korle index.html dekhabe
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Order link-e (/order) click korle order.html dekhabe
app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'order.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});