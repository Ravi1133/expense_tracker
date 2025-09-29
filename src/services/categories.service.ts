import { NextFunction, Request, Response } from "express"
import { prisma } from "../db/connection"
import { categoryBody } from "../utils/interfaces"
import { predefinetext } from "../utils/predefineText"
import { redisClient } from "../utils/redis"

export const addCategory_service = async (req: Request, res: Response, next: NextFunction) => {
    let { name, type } = req.body as categoryBody
    await redisClient.del("category");
    let categoryData = await prisma.category.create({ data: { name, type } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED, category: categoryData })
}

export const updateCategoriy_service = (req: Request, res: Response, next: NextFunction) => {
}

export const deleteCategory_service = () => {
}

export const getCategories_service = async (req: Request, res: Response, next: NextFunction) => {
    let cacheData = await redisClient.get("category")
    let categories: any[] = []
    if (cacheData) {
        categories = JSON.parse(cacheData)
    } else {
        categories = await prisma.category.findMany()
        await redisClient.setEx("category", 3600,JSON.stringify(categories))
    }
    return res.status(200).send({ categories })
    // let categories = await prisma.category.findMany()
    // return res.status(200).send({ categories })
}

export const getCategory_service = () => {
}
