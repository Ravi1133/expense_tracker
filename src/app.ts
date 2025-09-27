import express ,{Application, Router} from "express"
import { categoryRouter } from "./routes/category.route"
import { transactionRoute } from "./routes/transaction.route"
import { userAndauthRouter } from "./routes/user_and_auth.route"
import { connectionFunction } from "./db/connection"
import { errorHandler } from "./errorHandler"
import dotenv from "dotenv"
import { userBody } from "./utils/interfaces"
declare module "express-serve-static-core"{
    interface Request{
        user?:userBody
    }
}
const app:Application =express()
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({ extended: true }))
connectionFunction()
app.use("/category",categoryRouter)
app.use("/transaction",transactionRoute)
app.use("/userAuth",userAndauthRouter)

app.use(errorHandler);

// app.use("/trasaction",tra)

export default app