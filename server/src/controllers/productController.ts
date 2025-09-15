import { Request, Response } from "express";
import * as productService from "../services/productService";
import { productsArraySchema } from "../utils/validator";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const getRecommendations = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; // set by authMiddleware
        const products = await productService.getRecommendations(userId);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to get recommendations" });
    }
};

export const createProducts = async (req: Request, res: Response) => {
    try {
        const validatedData = productsArraySchema.parse(req.body);

        const result = await productService.createProducts(validatedData);

        res.status(201).json({
            message: `${result.count} products created successfully`,
        });
    } catch (err: any) {
        console.error("Create products error:", err);
        res.status(400).json({ error: err.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: "Failed to update product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete product" });
    }
};
