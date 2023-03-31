import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.JWT_SECRET ?? 'default_secret';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Missing auth token' });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET) as { userId: number };
        const userId = decodedToken.userId;
        req.body.userId = userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid auth token' });
    }
}

