require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const checkoutRoutes = require('./routes/checkoutRoutes');
const logger = require('./utils/logger');

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL || '*' }));


app.use(express.json());


app.use('/api/checkout', checkoutRoutes);


app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger(`Server listening on port ${PORT}`);
});
