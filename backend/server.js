const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
