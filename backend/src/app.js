const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'GameMatch AI backend is running.' });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found.' });
});

module.exports = app;
