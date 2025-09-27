import { Router } from "express";
import {addCategories,getCategories} from "../controllers/categories"
import { addTransaction, deleteTransaction, getTrasaction } from "../controllers/transactions";
import { validateAddTransactionBody } from "../utils/validators";
import { validateToken } from "../utils/utliFunction";
import { getTransaction_service } from "../services/transaction.service";
export const transactionRoute=Router()
transactionRoute.post("/addTransaction",validateToken ,validateAddTransactionBody,addTransaction)
transactionRoute.get("/getTransactions/:id",validateToken ,getTrasaction)
transactionRoute.delete("/deleteTransaction/:id",validateToken ,deleteTransaction)

