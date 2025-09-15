import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
    createInvestment,
    getPortfolio,
    getInvestmentById,
    cancelInvestment,
} from "../controllers/investController";

const router = express.Router();

// User creates an investment
router.post("/", authMiddleware, createInvestment);

// User fetches their portfolio
router.get("/portfolio", authMiddleware, getPortfolio);

// Get details of one investment
router.get("/:id", authMiddleware, getInvestmentById);

// Cancel investment
router.put("/:id/cancel", authMiddleware, cancelInvestment);

export default router;
