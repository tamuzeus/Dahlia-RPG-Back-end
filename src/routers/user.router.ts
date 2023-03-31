import express from 'express';
import { loginController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/token.middleware';

const userRouter = express.Router();

userRouter.post('/', loginController.postUser);
userRouter.get('/', loginController.getLogin);

export { userRouter };
