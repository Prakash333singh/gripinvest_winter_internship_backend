import { User, InvestmentProduct } from "@prisma/client";

export const generateProductDescription = (data: any): string => {
    return `The ${data.name} is a ${data.risk_level}-risk ${data.investment_type} product with an annual yield of ${data.annual_yield}% and a tenure of ${data.tenure_months} months. Minimum investment starts at ₹${data.min_investment}.`;
};

export const recommendProducts = (user: User | null, products: InvestmentProduct[]): InvestmentProduct[] => {
    if (!user) return [];

    return products.filter((p) => {
        if (user.risk_appetite === "low") return p.risk_level === "low";
        if (user.risk_appetite === "moderate") return p.risk_level !== "high";
        return true; // high risk appetite → all products
    });
};
