import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routeCustomer from "./routes/customer.js"
import routerCategory from './routes/category.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import routerProduct from "./routes/product.js";
dotenv.config()

const connect= async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
    }catch(error){
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})

const app = express();
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/customer",routeCustomer)
app.use("/api/category",routerCategory)
app.use("/api/product",routerProduct)

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Somthing went wrong!"
    return res.status(errorMessage).json({
        success: false, 
        status : errorStatus,
        message : errorMessage,
        stack: err.stack
    })
})


app.listen(3000,()=>{
    console.log("Connect to backend!")
    connect()
})




