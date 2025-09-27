import { NextFunction, Request, Response } from "express"
import { getUserById_service, loginUser_service, registerUser_service } from "../services/user_and_auth.service"

export const registerUser=(req:Request,res:Response,next:NextFunction)=>registerUser_service(req,res,next)
export const loginUser=(req:Request,res:Response,next:NextFunction)=>loginUser_service(req,res,next)
export const resetPassword=(req:Request,res:Response)=>{}
export const logout=(req:Request,res:Response)=>{}
export const getUser=(req:Request,res:Response,next:NextFunction)=>{}
export const getUserById=(req:Request,res:Response,next:NextFunction)=>getUserById_service(req,res,next)
export const deleteUserById=(req:Request,res:Response)=>{}
export const getUsers=(req:Request,res:Response)=>{}