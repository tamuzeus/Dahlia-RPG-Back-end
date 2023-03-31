import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { usersRouter } from "./routers/testConnection./testConnection";

dotenv.config();

const app = express();
app.use(cors())
   .use(express.json())
   .get("/health", (req, res) => res.send("Ok!"))
   .use("/status", usersRouter);

app.listen(process.env.PORT, () => {
   console.log(`Server listening on port ${process.env.PORT}.`);
});

//to drop port: sudo kill -9 `sudo lsof -t -i:4000`
