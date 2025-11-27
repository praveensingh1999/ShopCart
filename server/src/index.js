import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/database.js";
import authRoutes from "./router/auth.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);




connect().then(()=>{
app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:3000`);
});
})
