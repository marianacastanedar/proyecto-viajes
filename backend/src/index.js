const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.get('/mariana-test', (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});
