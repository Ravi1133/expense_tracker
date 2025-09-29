import { NextFunction, Request, Response } from "express";
import { addTransaction_service, deleteTransaction_service, getAllTransaction_service, getTransaction_service, updateTransaction_service } from "../services/transaction.service";

export const addTransaction=(req:Request,res:Response,next:NextFunction)=>addTransaction_service(req,res,next)
export const updateTransaction=(req:Request,res:Response,next:NextFunction)=>updateTransaction_service(req,res,next)
export const deleteTransaction=(req:Request,res:Response,next:NextFunction)=>deleteTransaction_service(req,res,next)
export const getTransaction=(req:Request,res:Response,next:NextFunction)=>getTransaction_service(req,res,next)
export const getAllTrasaction=(req:Request,res:Response,next:NextFunction)=>getAllTransaction_service(req,res,next)

