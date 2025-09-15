import { prisma } from "../prisma";
import { Request, Response } from "express";
import { summarizeErrors } from "../utils/aiErrorHelper";

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.transactionLog.findMany({
            orderBy: { created_at: "desc" },
            take: 100,
        });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch logs" });
    }
};

export const getErrorSummary = async (req: Request, res: Response) => {
    try {
        const errors = await prisma.transactionLog.findMany({
            where: { error_message: { not: null } },
            orderBy: { created_at: "desc" },
            take: 200,
        });

        const summary = summarizeErrors(errors.map(e => e.error_message || ""));
        res.json({ summary });
    } catch (err) {
        res.status(500).json({ error: "Failed to summarize errors" });
    }
};
