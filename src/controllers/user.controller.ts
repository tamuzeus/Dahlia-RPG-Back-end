import { Request, Response } from 'express';
import { loginService } from '../services/user.services';

async function postUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    //send email N password to validation in service
    const newUser = await loginService.createUser(email, password);

    //recive newuser after validations
    res.json(newUser).status(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    //send email N password to validation in service
    const { user, session } = await loginService.login(email, password);
    
    //remove password
    const {password:_, ...userLogin } = user;

    //recive user and token after validations
    res.json({
      user: userLogin,
      session
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

export const loginController = {
  postUser, getLogin
};