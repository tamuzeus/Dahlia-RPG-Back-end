import prisma from "../../db/database";
import { User } from '../../protocols'

async function findManyUsers(): Promise<User[]> {
    return prisma.users.findMany();
}

export const testConnectionRepo = {
    findManyUsers
}
 