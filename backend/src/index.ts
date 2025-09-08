// import express from 'express';
// // import cors from 'cors';
// import helmet from 'helmet';
// import { PORT } from './config.js';
// import healthRouter from "../src/routes/health.ts";
// import {transactionLogger}  from '../middleware/transaction.js';


// const app = express();
// app.use(helmet());
// // app.use(cors());
// app.use(express.json());
// app.use(transactionLogger);


// app.use('/health', healthRouter);


// app.get('/', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });