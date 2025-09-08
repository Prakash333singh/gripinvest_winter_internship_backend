// // src/services/investmentService.ts
// import { prisma } from '../prisma';

// // Create product
// export async function createProduct(name: string, description: string, returns: number) {
//     return prisma.investmentProduct.create({
//         data: { name, description, returns },
//     });
// }

// // Fetch products
// export async function listProducts() {
//     return prisma.investmentProduct.findMany();
// }

// // Update
// export async function updateProduct(id: number, updates: any) {
//     return prisma.investmentProduct.update({
//         where: { id },
//         data: updates,
//     });
// }

// // Delete
// export async function deleteProduct(id: number) {
//     return prisma.investmentProduct.delete({
//         where: { id },
//     });
// }
