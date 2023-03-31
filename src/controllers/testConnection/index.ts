import { Request, Response } from 'express';
import { testConnectionRepo } from "../../repositories/testConnection";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await testConnectionRepo.findManyUsers();
    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
}
