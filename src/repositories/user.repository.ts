import prisma from '../db/database';
import bcrypt from 'bcrypt';
import { sessions, users } from '.prisma/client';

async function createUser(email: string, password: string) {
  try {

    //hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  }
}

async function getUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  });
}

async function getUserByEmailAndPassword(email: string, password: string) {

  //find user
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  //validation password in db with bycript
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
}

async function createSession(user: users, token: string): Promise<sessions> {
  return prisma.sessions.create({
    data: {
      userid: user.id,
      token: token
    }
  });
}


async function deleteAllSessions(userId: number | null) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId!,
    },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return prisma.sessions.deleteMany({
    where: {
      userid: user.id,
    },
  });
}

async function deleteUserByIdAndEmailAndPassword(id: number, email: string, password: string) {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!user || user.email !== email) {
    throw new Error('User not found,..');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password...');
  }

  return prisma.users.delete({
    where: {
      id,
    },
  });
}

async function getManyEmail() {
  const users = await prisma.users.findMany({
    select: {
      email: true,
    },
  });

  return users.map((user) => user.email);
}


export const loginRepository = {
  createUser, getManyEmail, getUserByEmail, getUserByEmailAndPassword, createSession, deleteAllSessions, deleteUserByIdAndEmailAndPassword
};