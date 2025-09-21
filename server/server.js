import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDb from './config/mongodb.js';
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js';
const app = express();
const port = process.env.PORT || 4000;
connectDb();
const allowedOrigins=['http://localhost:5173']
app.use(express.json());
app.use(cookieParser()) ;
app.use(cors({origin:allowedOrigins , credentials:true}));

// Api endpoint
app.get('/',(req,res)=>{
    res.send('homepage');
})
app.use('/api/auth',authRouter);
app.use('/api/user' , userRouter);
app.listen((port),(req,res) =>{
    console.log(`http://localhost:${port}`);
})
