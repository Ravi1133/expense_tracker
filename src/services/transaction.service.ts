import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/connection";
import { TransactionBody, TransactionSearcBody } from "../utils/interfaces";
import { predefinetext } from "../utils/predefineText";
import { Status } from "../utils/enums";
import { redisClient } from "../utils/redis";

export const addTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { amount, categoryId, type, userId, description, transactionDate } = req.body as TransactionBody
    let addedTransation = await prisma.transaction.create({ data: { amount, categoryId, userId, type, description, transactionDate } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED, transaction: addedTransation })
}

export const getTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run");

    if (!req?.user) return;

    console.log("req.body", req.body);

    const { categoryId, amount, type, page, pageSize } = req.body as TransactionSearcBody;
    const userId = req.user.id;

    // ✅ Create a proper unique cache key
    const cacheKey = `transaction:${userId}:${categoryId || "all"}:${type || "all"}:${amount || "all"}:${page}:${pageSize}`;

    let transaction: any = {};
    let where: any = { status: "ACTIVE" };
    if(userId)where.userId=userId
    if (categoryId) where.categoryId = categoryId;
    if (type) where.type = type;
    if (amount) where.amount = { lte: amount };

    // ✅ Check Redis cache
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
        console.log("cache data available");
        transaction = JSON.parse(cacheData);
    } else {
        // Count total records
        const totalCount = await prisma.transaction.count({ where });

        const pagination = {
            page,
            pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        };

        const take = pageSize;
        const skip = (page - 1) * pageSize; // ✅ Fixed skip calculation
        console.log("where in get transaction",where)
        // Fetch fresh data
        const extractedData = await prisma.transaction.findMany({
            where,
            take,
            skip,
            include: {
                user: { select: { id: true, name: true, email: true } },
                category: {},
            },
        });
        transaction = { data: extractedData, pagination };
        // ✅ Save to Redis with proper key
        await redisClient.setEx(cacheKey, 60, JSON.stringify(transaction));
    }

    const message = transaction.data?.length
        ? predefinetext.RESOURCE_FETCHED
        : predefinetext.NO_DATA_FOUND;

    res.send({ message, transaction });
};


export const getAllTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let { categoryId, pageSize, page, userId, type, amount ,startDate,endDate} = req.body as TransactionSearcBody
    let id = parseInt(req.params.id)
    const where: any = { status: "ACTIVE" }

    if (categoryId) where.categoryId = categoryId
    if (type) where.type = type
    if (amount) where.amount = { lte: amount }
    if (userId) where.userId = userId
    if(startDate)where.transactionDate={gte: new Date(startDate)}
    if(endDate)where.transactionDate={ lte:new Date(endDate)}

    let take = pageSize ? parseInt(pageSize.toString()) : 10
    let skip = page ? (parseInt(page.toString()) - 1) * take : 0
    console.log("where ingetall",where)
    let extractedData = await prisma.transaction.findMany({
        where, take, skip, include: {
            user: { select: { id: true, name: true, email: true } },
            category: {},
        }, orderBy: { createdAt: "desc" }
    })
    let totalCount = await prisma.transaction.count({ where })
    let transaction = {}
    let message = extractedData.length ? predefinetext.RESOURCE_FETCHED : predefinetext.NO_DATA_FOUND
    res.send({
        message: message, transaction: {
            data: extractedData, pagination: {
                totalCount,
                page,
                skip,
                totalPages: Math.ceil(totalCount / take)
            }
        }
    })
}


export const updateTransaction_service = async ( req: Request,res: Response,next: NextFunction) => {
  try {
    console.log("update transaction run");
    
    let {
        id,
      amount,
      categoryId,
      type,
      userId,
      description,
      transactionDate,
    } = req.body as Partial<TransactionBody> &{id:string};

    // Check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      return res
        .status(404)
        .send({ message: "Transaction not found" });
    }

    // Update the transaction
    let data:any={}
    if( transactionDate) data.transactionDate =new Date(transactionDate)
    if( amount) data.amount =amount
    if( categoryId) data.categoryId =categoryId
    if( type) data.type =type
    if( description) data.description =description
    console.log("data to update",data)
    const cacheKey = `transaction:${userId}:${categoryId || "all"}:${type || "all"}:${amount || "all"}:1:10`;
    const cacheData = await redisClient.del(cacheKey);
    
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data
    });

    return res.status(200).send({
      message: predefinetext.RESOURCE_UPDATED || "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    next(error);
  }
};

export const deleteTransaction_service = async (req: Request, res: Response, next: NextFunction) => {
    console.log("transaction run")
    let id = parseInt(req.params.id)
    await prisma.transaction.update({ where: { id }, data: { status: Status.INACTIVE } })
    res.send({ message: predefinetext.STATUS_UPDATED })
}