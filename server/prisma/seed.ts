import { prisma } from "../src/prisma";

async function main() {
    await prisma.investmentProduct.createMany({
        data: [
            {
                name: "SafeGov Bond",
                investment_type: "bond",
                tenure_months: 12,
                annual_yield: 6.5,
                risk_level: "low",
                min_investment: 1000,
                max_investment: 50000,
                description: "Secure government bond",
            },
            {
                name: "Growth Mutual Fund",
                investment_type: "mf",
                tenure_months: 36,
                annual_yield: 12.5,
                risk_level: "moderate",
                min_investment: 5000,
                max_investment: 200000,
                description: "Balanced growth-oriented MF",
            },
        ],
    });
}

main().catch(e => {
    console.error(e);
}).finally(() => prisma.$disconnect());
