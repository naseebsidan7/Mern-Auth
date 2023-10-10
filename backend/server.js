import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db.js";
import {errorHandler,notFound} from './middleware/errorMiddleware.js'
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
import UserRouter from './routes/userRouter.js'
import AdminRouter from "./routes/adminRouter.js";

connectDB(); 

const app =express();
 
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({extended:true }))

app.use(cookieParser());

app.use('/api/users',UserRouter)
app.use('/api/admin',AdminRouter)
app.get('/',(req,res)=> res.send('server is Running'));

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>console.log(`Server Started on port ${port}`))
  