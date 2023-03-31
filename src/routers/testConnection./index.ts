import { Router } from "express";
import { getAllUsers } from "../../controllers/testConnection";

const usersRouter = Router();

usersRouter.get("/",  getAllUsers);

export { usersRouter};
