import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    investment_type: z.enum(["bond", "fd", "mf", "etf", "other"]),  // must match your enum
    tenure_months: z.number().int().positive(),
    annual_yield: z.number().positive(),
    risk_level: z.enum(["low", "moderate", "high"]),  // must match your enum
    min_investment: z.number().positive().optional(),
    max_investment: z.number().positive().optional(),
    description: z.string().optional(),
});

export const productsArraySchema = z.array(productSchema);
