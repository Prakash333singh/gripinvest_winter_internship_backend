import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT ?? 4000;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? 'dev_access_secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'dev_refresh_secret';
export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map(s => s.trim()).filter(Boolean);