const express = require('express');
const  mongoose = require('mongoose');
const cors= require('cors');
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions')
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(()=> console.log("mongoDb Connected")).catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use('/api/transactions', transactionRoutes);
app.listen(PORT ,()=> console.log(`Server is running on port ${PORT}`))