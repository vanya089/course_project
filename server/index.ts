import express from "express";
import cors = require("cors");
import cookieParser from "cookie-parser";


const PORT = 5000;
const app = express();
const start = async () => {
    try {
        await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()