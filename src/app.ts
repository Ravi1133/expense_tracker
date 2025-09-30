import express, { Application, Router } from "express"
import { categoryRouter } from "./routes/category.route"
import { transactionRoute } from "./routes/transaction.route"
import { userAndauthRouter } from "./routes/user_and_auth.route"
import { connectionFunction } from "./db/connection"
import { errorHandler } from "./errorHandler"
import dotenv from "dotenv"
import { userBody } from "./utils/interfaces"
import { authRateLimit, transactionRateLimit } from "./utils/utliFunction"
import { redisConnect } from "./utils/redis"
import cors from "cors"
import { setupSwagger } from "./swaggerFolder/swagger"



console.log("setupSwagger",setupSwagger)
declare module "express-serve-static-core" {
    interface Request {
        user?: userBody
    }
}
declare global {
  namespace Express {
    export interface Request {
      user?: userBody; // <-- make this available globally
    }
  }
}
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(express.urlencoded({ extended: true }))
redisConnect()
connectionFunction()
app.use("/category", categoryRouter)
// app.use("/transaction",transactionRateLimit, transactionRoute)
// app.use("/userAuth",authRateLimit, userAndauthRouter)
app.use("/userAuth", userAndauthRouter)
app.use("/transaction", transactionRoute)

setupSwagger(app);


app.use(errorHandler);

// app.use("/trasaction",tra)

export default app