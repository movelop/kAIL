import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';    
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome");
})



const PORT = process.env.Port || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
    
})