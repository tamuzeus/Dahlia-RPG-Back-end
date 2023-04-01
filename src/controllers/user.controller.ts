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
    console.log(error.message)
    if(error.message === 'Email already registered'){
      res.status(409).json({ message: error.message })
    }else{
      res.status(500).json({ message: error.message });
    }
  }
}

export async function postLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    //send email N password to validation in service
    const { user, session } = await loginService.login(email, password);
    
    //remove password
    const {password:_, ...userLogin } = user;

    //recive user and token after validations
    res.json({
      session
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

export const loginController = {
  postUser, postLogin
};