// src/middlewares/transactionLogger.ts
import { prisma } from '../prisma';
import { Request, Response, NextFunction } from 'express';

export async function transactionLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
        await prisma.transactionLog.create({
            data: {
                endpoint: req.originalUrl,
                method: req.method,
                statusCode: res.statusCode,
                responseTime: Date.now() - start,
                errorMessage: res.statusCode >= 400 ? 'Error occurred' : null,
            },
        });
    });

    next();
}
