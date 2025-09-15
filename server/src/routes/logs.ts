import express from "express";
import { getLogs, getErrorSummary } from "../controllers/logController";
import { adminMiddleware } from "../middleware/adminGuard";

const router = express.Router();

// Only admin can see logs
router.get("/", adminMiddleware, getLogs);
router.get("/summary", adminMiddleware, getErrorSummary);

export default router;
