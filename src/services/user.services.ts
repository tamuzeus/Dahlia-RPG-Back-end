import { loginRepository } from '../repositories/user.repository';
import { userSchema } from '../schemas/user.schema';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
//JWT_SECRET in env
const SECRET = process.env.JWT_SECRET ?? '';

async function createUser(email: string, password: string) {
  try {
    //Joi validation
    const validation = userSchema.validate({ email, password });
    if (validation.error) {
      throw new Error('Invalid user data');
    }

    //find existingUser
    const existingUser = await loginRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    //createUSer
    const user = await loginRepository.createUser(email, password);
    return user;
  } catch (error: any) {
    if (error.message === 'Email already registered') {
      throw error;
    } else {
      console.error(error);
      throw new Error('Error creating user');
    }
  }
}

export async function login(email: string, password: string) {
  try {
    //recive promise for compare and get email and password
    const user = await loginRepository.getUserByEmailAndPassword(email, password);
    
    //create JWT
    const token = jwt.sign({ userId: user.id }, SECRET, {
      expiresIn: '2h',
    });

    //create session with JWT token
    const session = await loginRepository.createSession(user, token);

    //return user and JWToken
    return { user, session };
  } catch (error) {
    throw new Error('Invalid email or password');
  }
}

export const loginService = {
  createUser, login
};
