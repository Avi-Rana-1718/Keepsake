import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import albumRoutes from "./routes/albumRoutes";
import photoRoutes from "./routes/photoRoutes";
import testingRoutes from "./routes/testingRoutes";

import auth from "./middleware/auth.middleware";

const app = express();
dotenv.config();

app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECERT,
    resave: false,
    saveUninitialized: true

}));

// routes
app.use("/auth", authRoutes);
app.use("/album", auth, albumRoutes);
app.use("/photo", auth, photoRoutes);
app.use("/test", testingRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server started at", process.env.PORT);
})
