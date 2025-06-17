require('dotenv').config(); 


const express = require('express');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/auth.routes');

const connectDB = require('./config/db');
connectDB();
const app = express();

const port = 5000;

app.use(express.json()); 

app.use('/api/posts/', postRoutes);
app.use('/api/auth/' , authRoutes );


app.get('/', (req , res) => {
    res.json({message:"Working request"})
});

app.listen(port , () => {
    console.log(`Server is running on PORT ${port}`)
});