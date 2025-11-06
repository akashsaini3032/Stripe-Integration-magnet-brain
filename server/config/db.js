const mongoose = require('mongoose');
const logger = require('../utils/logger');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => logger('MongoDB connected'));
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
