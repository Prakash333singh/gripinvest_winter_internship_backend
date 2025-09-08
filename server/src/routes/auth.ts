import express from 'express';
import { signup, login, requestPasswordReset, resetPassword } from '../services/authService';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user = await signup(req.body.email, req.body.password,req.body.firstName,req.body.lastName);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error ? error.message : String(error)) });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.email, req.body.password);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: (e instanceof Error ? e.message : String(e))});
    }
});
router.post('/password/request-reset', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await requestPasswordReset(email);
        res.json(result);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/password/reset', async (req, res) => {
    const { email, token, newPassword } = req.body;
    try {
        const result = await resetPassword(email, token, newPassword);
        res.json(result);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
