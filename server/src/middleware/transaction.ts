import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

export async function transactionLogger(req: Request, res: Response, next: NextFunction) {
    // const start = Date.now();

    // Capture response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
        // const duration = Date.now() - start;

        prisma.transactionLog.create({
            data: {
                endpoint: req.originalUrl,
                method: req.method,
                status_code: res.statusCode,
                error_message: res.statusCode >= 400 ? JSON.stringify(body) : undefined,
                user: (req as any).user?.id
                    ? { connect: { id: (req as any).user.id } }
                    : undefined,
            },
        }).catch(err => console.error("Failed to log transaction:", err));

        return originalJson(body);
    };

    next();
}
