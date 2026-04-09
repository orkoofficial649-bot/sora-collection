const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // Sharee or Bangles
    price: { type: Number, required: true },
    description: String,
    imageUrl: String,
    stock: { type: Number, default: 10 }
});

module.exports = mongoose.model('Product', productSchema);