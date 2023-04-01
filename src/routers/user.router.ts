import express from 'express';
import { loginController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/', loginController.postUser)
userRouter.get('/', loginController.getEmail)
userRouter.get('/all', loginController.getAllEmail)
userRouter.post('/login', loginController.postLogin)
userRouter.delete('/deleteuser', loginController.deleteUser)
userRouter.delete('/', loginController.deleteSessions)

export { userRouter };
