import { NextFunction, Request, Response } from "express"
import { addCategory_service, getCategories_service } from "../services/categories.service"

export const addCategories=(req:Request,res:Response,next:NextFunction)=>addCategory_service(req,res,next)
export const updateCategories=()=>{}
export const deleteCategory=()=>{}
export const getCategories=(req:Request,res:Response,next:NextFunction)=>getCategories_service(req,res,next)
export const getCategory=()=>{}


