import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail(
    email: string,
    subject: string,
    text: string
) {
    try {
        const info = await transporter.sendMail({
            from: `"GripInvest" <${process.env.SMTP_USER}>`,
            to: email,
            subject,
            text,
        });

        console.log(`✅ Email sent: ${info.messageId}`);
        return true;
    } catch (err: any) {
        console.error(`❌ Email failed: ${err.message}`);
        return false;
    }
}
