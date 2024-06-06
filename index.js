require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const corsMiddleware = require("./middleware/cors.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const cookieParser = require("cookie-parser")
const app = express();
const router = require("./routes/index");
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser());

app.use("/api", router);
app.use(errorMiddleware);


const start = async () => {

    try{
        await mongoose.connect(process.env.DB_URL)
        
        app.listen(PORT, () => {
            console.log("Server has been started on port:", PORT)
        })
        
    } catch(e) {
        
    }
}

start();