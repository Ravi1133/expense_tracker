import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/connection";
import { TransactionBody } from "../utils/interfaces";
import { predefinetext } from "../utils/predefineText";
import { Status } from "../utils/enums";

export const addTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { amount, categoryId, type, userId, description } = req.body as TransactionBody
    let addedTransation = await prisma.transaction.create({ data: { amount, categoryId, userId, type, description } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED, transaction: addedTransation })
}
export const getTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let id = parseInt(req.params.id)
    let transation = await prisma.transaction.findMany({ where: { userId: id } })
    let message = transation.length ? predefinetext.RESOURCE_FETCHED : predefinetext.NO_DATA_FOUND
    res.send({ message: message, transation })
}

export const updateTransaction_service = (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    res.send({ message: "hii transaction" })
}


export const deleteTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let id = parseInt(req.params.id)
    await prisma.transaction.update({ where: { id }, data: { status: Status.INACTIVE } })
    res.send({ message: predefinetext.STATUS_UPDATED })
}