import { NextFunction, Request, Response } from "express"
import { prisma } from "../db/connection"
import { categoryBody } from "../utils/interfaces"
import { predefinetext } from "../utils/predefineText"

export const addCategory_service = async (req: Request, res: Response, next: NextFunction) => {
    let { name, type } = req.body as categoryBody
    let categoryData =await prisma.category.create({ data: { name, type } })
    return res.status(201).send({ message: predefinetext.RESOURCE_CREATED,category:categoryData })
}

export const updateCategoriy_service = (req: Request, res: Response, next: NextFunction) => {
}

export const deleteCategory_service = () => {
}

export const getCategories_service = async (req: Request, res: Response, next: NextFunction) => {
    let categories = await prisma.category.findMany()
    return res.status(200).send({ categories })
}

export const getCategory_service = () => {
}
