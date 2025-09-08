import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map(s => s.trim()).filter(Boolean);