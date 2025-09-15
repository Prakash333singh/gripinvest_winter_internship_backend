import { prisma } from "../prisma";
import { generatePortfolioInsights } from "../utils/aiPortfolioHelper";

export async function createInvestment(userId: string, productId: string, amount: number) {
    // Fetch product
    const product = await prisma.investmentProduct.findUnique({
        where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Validate min/max
    if (product.min_investment && amount < Number(product.min_investment)) {
        throw new Error(`Minimum investment is ${product.min_investment}`);
    }
    if (product.max_investment && amount > Number(product.max_investment)) {
        throw new Error(`Maximum investment is ${product.max_investment}`);
    }

    // TODO: balance check (if we add balance field in user)

    // Expected return (simple compound interest calculation for now)
    const expectedReturn = (amount * Number(product.annual_yield) * product.tenure_months) / (12 * 100);

    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + product.tenure_months);

    // Save investment
    const investment = await prisma.investment.create({
        data: {
            user_id: userId,
            product_id: productId,
            amount,
            expected_return: expectedReturn,
            maturity_date: maturityDate,
            status: "active",
        },
    });

    return investment;
}

export async function getPortfolio(userId: string) {
    const investments = await prisma.investment.findMany({
        where: { user_id: userId },
        include: { product: true },
    });

    // AI insights
    const insights = generatePortfolioInsights(investments);

    return { investments, insights };
}

export async function getInvestmentById(userId: string, investmentId: string) {
    const investment = await prisma.investment.findFirst({
        where: { id: investmentId, user_id: userId },
        include: { product: true },
    });

    if (!investment) throw new Error("Investment not found");
    return investment;
}

export async function cancelInvestment(userId: string, investmentId: string) {
    const investment = await prisma.investment.findFirst({
        where: { id: investmentId, user_id: userId, status: "active" },
    });

    if (!investment) throw new Error("Investment not found or already cancelled");

    const updated = await prisma.investment.update({
        where: { id: investmentId },
        data: { status: "cancelled" },
    });

    return { message: "Investment cancelled", investment: updated };
}
