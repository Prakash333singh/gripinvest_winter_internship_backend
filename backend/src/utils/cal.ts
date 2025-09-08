
// import { Decimal } from '@prisma/client/runtime';


// /**
// * expected_return = amount * (1 + annual_yield/100)^(tenure_months/12) - amount
// * We'll return decimal as number for simplicity
// */
// export function computeExpectedReturn(amount: number, annual_yield: number, tenure_months: number): number {
//     const years = tenure_months / 12;
//     const total = amount * Math.pow(1 + (annual_yield / 100), years);
//     const expected = total - amount;
//     return Number(expected.toFixed(2));
// }