import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(403).json({ error: "Authorization header not found!" });
    }
    const token = authHeaders.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await User.findOne({_id:decodedToken.userId});
        if (!user) {
            return res.status(403).json({ error: "Not Authorized!" });
        }
        req.body = Object.assign(req.body, {userId: decodedToken.userId})
        next();
    } catch (err) {
        return res.status(403).json({ error: "Not Authorized!" });
    }
};
