import express from "express"
import cors from "cors"
import helmet from "helmet"
import { PORT } from "../../server/src/config"
import authRoutes from "./routes/auth"
import productRoutes from "./routes/products"
import investmentRoutes from "./routes/investments"
import { transactionLogger } from "./middleware/transaction";
import logRouter from "./routes/logs"; 
import healthRouter from "./routes/health";




const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for form data

app.get("/", (req, res) =>
    res.json({ ok: true, time: new Date().toISOString() })
)
app.use(transactionLogger); // Apply transaction logger middleware
app.use("/health", healthRouter);
app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes )
app.use("/api/investment", investmentRoutes)
app.use("/logs", logRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
