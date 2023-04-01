import { Request, Response } from 'express';
import { loginService } from '../services/user.services';
import { loginRepository } from '../repositories/user.repository';

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

export async function getEmail(req: Request, res: Response) {
  const { email } = req.body;

  try {
    //send email
    const getByEmail = await loginRepository.getUserByEmail(email);

    //recive email
    res.json({
      getByEmail
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email' });
  }
}

export async function deleteSessions(req: Request, res: Response) {
  const { email, password } = req.body;
  const getByEmail = await loginRepository.getUserByEmail(email)

  try {
    //send email and password
    const { session } = await loginService.login(email, password);
    const userId = session.userid;
    loginRepository.deleteAllSessions(userId);
    const returning = {
      Action: `Delete sessions of email: ${getByEmail?.email}`
    }

    //recive email 
    res.json({
      returning
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    //send email and password
    const getByEmail = await loginRepository.getUserByEmail(email)
    const id = getByEmail?.id

    if (id === undefined) {
      throw new Error('User not found');
    }
    
    await loginRepository.deleteUserByIdAndEmailAndPassword(id, email, password)

    const returning = {
      Action: `Delete user: ${getByEmail?.email}`
    }
    
    //recive email
    res.json({
      returning
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

async function getAllEmail(req: Request, res: Response) {
  try {
    const getAll = await loginRepository.getManyEmail()
  
    res.json({
      getAll
    }).status(200);
    ;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}

// export async function newPassword(req: Request, res: Response) {
//   const { email, password } = req.body;
//   try {
//     //send email and password
//     const getByEmail = await loginRepository.getUserByEmail(email)
//     const id = getByEmail?.id

//     if (id === undefined) {
//       throw new Error('User not found');
//     }
    
//     await loginRepository.deleteUserByIdAndEmailAndPassword(id, email, password)

//     const returning = {
//       Action: `Delete user: ${getByEmail?.email}`
//     }
    
//     //recive email
//     res.json({
//       returning
//     }).status(200);
//     ;
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// }


export const loginController = {
  postUser, postLogin, getEmail, deleteSessions, deleteUser, getAllEmail
};