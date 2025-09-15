import express from "express";
import {getProducts,getRecommendations,createProducts,updateProduct,deleteProduct} from "../controllers/productController";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/adminGuard";

const router = express.Router();

// Public - fetch all products
router.get("/", authMiddleware, getProducts);

// Public - recommendations
router.get("/recommendations", authMiddleware,getRecommendations);

// Admin - CRUD
router.post("/", authMiddleware, adminMiddleware,createProducts);
router.put("/:id", authMiddleware, adminMiddleware,updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware,deleteProduct);

export default router;
