const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());
