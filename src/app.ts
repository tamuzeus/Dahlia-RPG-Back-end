import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routers/user.router'

dotenv.config();

const app = express();
app.use(cors())
   .use(express.json())
   .get('/health', (req, res) => res.send('Ok!'))
   .use('/', userRouter)

app.listen(process.env.PORT, () => {
   console.log(`Server listening on port ${process.env.PORT}.`);
});

//to drop port: sudo kill -9 `sudo lsof -t -i:4000`
