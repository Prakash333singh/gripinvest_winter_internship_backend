import express from "express";
import { prisma } from "../prisma";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ service: "ok", db: "up", time: new Date().toISOString() });
    } catch {
        res.status(500).json({ service: "ok", db: "down" });
    }
});

export default router;
