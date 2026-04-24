const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection String
const mongoURI = "mongodb+srv://orkoofficial649_db_user:Orko8899@clustere.usoryuv.mongodb.net/sora_collection?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("SORA DB Connected to MongoDB Atlas!"))
    .catch(err => console.log("DB Connection Error: ", err));

// Route
app.get('/', (req, res) => {
    res.send("SORA Collection Backend is Live!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});