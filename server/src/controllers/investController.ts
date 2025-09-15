import { Request, Response } from "express";
import * as investmentService from "../services/investService";

export const createInvestment = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId; // from JWT middleware
        const { productId, amount } = req.body;

        const investment = await investmentService.createInvestment(userId, productId, amount);

        res.status(201).json(investment);
    } catch (err: any) {
        console.error("Create investment error:", err);
        res.status(400).json({ error: err.message });
    }
};

export const getPortfolio = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const portfolio = await investmentService.getPortfolio(userId);
        res.json(portfolio);
    } catch (err: any) {
        console.error("Get portfolio error:", err);
        res.status(400).json({ error: err.message });
    }
};

export const getInvestmentById = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { id } = req.params;

        const investment = await investmentService.getInvestmentById(userId, id);

        res.json(investment);
    } catch (err: any) {
        console.error("Get investment error:", err);
        res.status(400).json({ error: err.message });
    }
};

export const cancelInvestment = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { id } = req.params;

        const result = await investmentService.cancelInvestment(userId, id);

        res.json(result);
    } catch (err: any) {
        console.error("Cancel investment error:", err);
        res.status(400).json({ error: err.message });
    }
};
