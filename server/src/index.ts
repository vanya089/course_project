import express from "express";
import cors from "cors";
const mongoose = require('mongoose').default;
require("dotenv").config();
import router = require("./router");
import ApiErrorHandler from "./error/ApiErrorHandler";

const corsOptions = {
    origin: ['http://localhost:3000','https://course-project-ten.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};



const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", router)
//app.use(ApiErrorHandler);

async function startApp() {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,});
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();