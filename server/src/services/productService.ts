import { prisma } from "../prisma";
import { generateProductDescription, recommendProducts } from "../utils/aiHelper";

export const getAllProducts = async () => {
    return prisma.investmentProduct.findMany();
};

export const getRecommendations = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const products = await prisma.investmentProduct.findMany();
    return recommendProducts(user, products);
};

export async function createProducts(productsData: any[]) {
    const products = await prisma.investmentProduct.createMany({
        data: productsData,
        skipDuplicates: true, // avoid duplicate insertions if same product name already exists
    });

    return products;
}
export const updateProduct = async (id: string, data: any) => {
    if (!data.description) {
        data.description = generateProductDescription(data);
    }
    return prisma.investmentProduct.update({
        where: { id },
        data,
    });
};

export const deleteProduct = async (id: string) => {
    return prisma.investmentProduct.delete({ where: { id } });
};
