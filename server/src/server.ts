import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import { PORT } from '../../server/src/config';
import authRoutes from './routes/auth';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use('/api/auth',authRoutes );


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});