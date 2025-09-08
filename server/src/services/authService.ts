import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import crypto from 'crypto';
import { sendEmail } from './emailService'; // your nodemailer setup

export async function signup(email: string, password: string, firstName: string, lastName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password_hash: hashedPassword,
            first_name: firstName,
            last_name: lastName,
        },
        select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            created_at: true,
        },
    });

    return user;
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select:{
            id: true,
            email:true,
            password_hash: true,
        }
    });

    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY as string, { expiresIn: '1d' });

    const { password_hash, ...safeUser } = user;
    return { token, user:safeUser };
}

export async function requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    // Generate random OTP (6 digits)
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Save token in DB (expires in 15 mins)
    const expires_at = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.passwordResetToken.create({
        data: { user_id: user.id, token, expires_at },
    });

    // Send email
    await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${token}`);

    return { message: 'OTP sent to your email' };
}

export async function resetPassword(email: string, token: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const resetToken = await prisma.passwordResetToken.findFirst({
        where: { user_id: user.id, token },
        orderBy: { created_at: 'desc' },
    });

    if (!resetToken) throw new Error('Invalid token');
    if (resetToken.expires_at < new Date()) throw new Error('Token expired');

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
        where: { id: user.id },
        data: { password_hash: hashedPassword },
    });

    // Delete used token
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return { message: 'Password updated successfully' };
}
