import { Investment, InvestmentProduct } from "@prisma/client";

type InvestmentWithProduct = Investment & { product: InvestmentProduct };

export function generatePortfolioInsights(investments: InvestmentWithProduct[]) {
    if (investments.length === 0) {
        return { message: "No investments yet. Diversify your portfolio to reduce risk." };
    }

    const total = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);

    const riskDistribution: Record<string, number> = {};
    investments.forEach(inv => {
        const risk = inv.product.risk_level;
        riskDistribution[risk] = (riskDistribution[risk] || 0) + Number(inv.amount);
    });

    // Convert to percentages
    Object.keys(riskDistribution).forEach(risk => {
        riskDistribution[risk] = +((riskDistribution[risk] / total) * 100).toFixed(2);
    });

    let suggestion = "Your portfolio is balanced.";
    if ((riskDistribution["high"] || 0) > 50) {
        suggestion = "High risk exposure detected. Consider adding safer products.";
    } else if ((riskDistribution["low"] || 0) > 70) {
        suggestion = "Mostly low risk. You could add some moderate/high risk to boost returns.";
    }

    return {
        totalInvestment: total,
        riskDistribution,
        suggestion,
    };
}
