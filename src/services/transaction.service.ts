import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/connection";
import { TransactionBody } from "../utils/interfaces";
import { predefinetext } from "../utils/predefineText";

export const addTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { amount, categoryId, type, userId } = req.body as TransactionBody
    let addedTransation = await prisma.transaction.create({ data: { amount, categoryId, userId, type } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED, transaction: addedTransation })
}
export const getTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let id = parseInt(req.params.id)
    let transation = await prisma.transaction.findMany({ where: { userId: id } })
    let message=transation.length ?predefinetext.RESOURCE_FETCHED:predefinetext.NO_DATA_FOUND
    res.send({ message: message,transation })
}

export const updateTransaction_service = (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    res.send({ message: "hii transaction" })
}


export const deleteTransaction_service = (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    res.send({ message: "hii transaction" })
}