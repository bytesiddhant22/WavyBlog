require('dotenv').config(); 


const express = require('express');
const postRoutes = require('./routes/postRoutes');

const connectDB = require('./config/db');
connectDB();
const app = express();

const port = 5000;

app.use(express.json()); 

app.use('/api/posts/', postRoutes);

app.get('/', (req , res) => {
    res.json({message:"Working request"})
});

app.listen(port , () => {
    console.log(`Server is running on PORT ${port}`)
});