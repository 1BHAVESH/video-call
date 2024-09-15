import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors"; 
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from "./routes/users.routes.js"

const uri = process.env.MONGO_URL;

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json({limit: "40kb"}))
app.use(express.urlencoded({limit: "40kb", extended: "true"}))

app.use("/api/v1/users", userRoutes); 

app.get("/home", (req, res) => {
    res.send("hello");
});

const start = async () => {
    try {
        // Connection to MongoDB 
        const connectionDb = await mongoose.connect(uri);
        
        // Logging the connection host
        console.log(`MONGO Connected, DB Host: ${connectionDb.connection.host}`);

        // Starting the server
        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`);
        });
    } catch (err) {
        // Error handling
        console.error("Error connecting to MongoDB:", err);
    }
}

// Starting the server
start();