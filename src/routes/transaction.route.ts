import { Router } from "express";
import {addCategories,getCategories} from "../controllers/categories"
import { addTransaction, deleteTransaction, getAllTrasaction, getTransaction } from "../controllers/transactions";
import { validateAddTransactionBody, validateTransactionSearch } from "../utils/validators";
import { validateToken } from "../utils/utliFunction";
import { getTransaction_service } from "../services/transaction.service";
export const transactionRoute=Router()
transactionRoute.post("/addTransaction",validateToken ,validateAddTransactionBody,addTransaction)
transactionRoute.get("/getTransaction",validateToken,getTransaction)
transactionRoute.post("/getTransactions",validateToken,validateTransactionSearch ,getAllTrasaction)
transactionRoute.delete("/deleteTransaction/:id",validateToken ,deleteTransaction)

