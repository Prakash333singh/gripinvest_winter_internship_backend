import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from '../config';

export interface AuthRequest extends Request {
    user?: { id: string; email: string; is_admin: boolean };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1] || "";

    try {
        if (!JWT_SECRET_KEY || typeof JWT_SECRET_KEY !== "string") {
            throw new Error("JWT secret key is not defined or not a string");
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as unknown as { id: string; email: string; is_admin: boolean };
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
