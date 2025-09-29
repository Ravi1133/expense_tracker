import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/connection";
import { TransactionBody, TransactionSearcBody } from "../utils/interfaces";
import { predefinetext } from "../utils/predefineText";
import { Status } from "../utils/enums";
import { redisClient } from "../utils/redis";

export const addTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { amount, categoryId, type, userId, description ,transactionDate} = req.body as TransactionBody
    let addedTransation = await prisma.transaction.create({ data: { amount, categoryId, userId, type, description,transactionDate } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED, transaction: addedTransation })
}

export const getTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    if(!req?.user)return
    let id = req.user.id
    let cacheData = await redisClient.get(`${req.params.id}`)
    let transaction=[]
    if (cacheData) {
        transaction=JSON.parse(cacheData)
    } else {
        transaction = await prisma.transaction.findMany({ where: { userId: id },include:{user:{select:{id:true,name:true,email:true}},category:{}} })
        await redisClient.setEx(`${req.params.id}`, 60,JSON.stringify(transaction))
    }
    let message = transaction.length ? predefinetext.RESOURCE_FETCHED : predefinetext.NO_DATA_FOUND
    res.send({ message: message, transaction })
}
export const getAllTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { categoryId, pageSize, page, userId, type, amount } = req.body as TransactionSearcBody
    let id = parseInt(req.params.id)
    const where: any = { status: "ACTIVE" }

    if (categoryId) where.categoryId = categoryId
    if (type) where.type = type
    if (amount) where.amount = { lte: amount }
    if (userId) where.userId = userId

    let take = pageSize ? parseInt(pageSize.toString()) : 10
    let skip = page ? (parseInt(page.toString()) - 1) * take : 0

    let transation = await prisma.transaction.findMany({ where, take, skip, orderBy: { createdAt: "desc" } })
    let totalCount = await prisma.transaction.count({ where })

    let message = transation.length ? predefinetext.RESOURCE_FETCHED : predefinetext.NO_DATA_FOUND
    res.send({
        message: message, data: transation, pagination: {
            totalCount,
            page,
            skip,
            totalPages: Math.ceil(totalCount / take)
        }
    })
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