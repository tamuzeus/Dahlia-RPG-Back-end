import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routers/user.router'

dotenv.config();

const app = express();
app.use(cors())
   .use(express.json())
   .use('/', userRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

//to drop port: sudo kill -9 `sudo lsof -t -i:4000`
