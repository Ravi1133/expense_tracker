import { NextFunction, Request, Response } from "express"
import { getUser_service, getUserById_service, loginUser_service, logout_service, registerUser_service, updateUser_service } from "../services/user_and_auth.service"
import { updateCategoriy_service } from "../services/categories.service"

export const registerUser=(req:Request,res:Response,next:NextFunction)=>registerUser_service(req,res,next)
export const updateUser=(req:Request,res:Response,next:NextFunction)=>updateUser_service(req,res,next)
export const loginUser=(req:Request,res:Response,next:NextFunction)=>loginUser_service(req,res,next)
export const resetPassword=(req:Request,res:Response)=>{}
// export const logout=(req:Request,res:Response)=>{logout_service(req,res,next)}
export const getUsers=(req:Request,res:Response,next:NextFunction)=>getUser_service(req,res,next)
export const getUserById=(req:Request,res:Response,next:NextFunction)=>getUserById_service(req,res,next)
export const deleteUserById=(req:Request,res:Response)=>{}
