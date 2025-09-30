import { NextFunction, Request, Response } from "express"
import { prisma } from "../db/connection"
// import { Gender } from "../generated/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { predefinetext } from "../utils/predefineText";
import { userSeachBody } from "../utils/interfaces";
type RegisterUserBody = {
    name: string;
    email: string;
    gender: "male"|"female";   
    password: string;
};
type UpdateUserBody = {
    name?: string;
    email?: string;
    gender?: "male"|"female";  
    password?: string;
};
type LoginBodyType = {
    email: string,
    password: string
}
let saltRound = 10
const JWT_KEY = process.env.SECREATE_KEY || "mykey"
export const registerUser_service = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let { email, gender, name, password } = req.body as RegisterUserBody
        console.log("req.body", req.body)
        let hashPassword = await bcrypt.hash(password, saltRound)
        let userData = await prisma.user.create({
            data: {
                name: name,
                email: email,
                gender: gender,
                password: hashPassword
            }
        })
        console.log("step check")
        res.send({ message: "hi from register service", userData: userData })
    } catch (err) {
        console.log("error catch in register user")
        next(err)
    }
}


export const updateUser_service = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {gender, name, password } = req.body as UpdateUserBody
        console.log("req.body", req.body)
        let userId
        if(req.user)userId=req.user.id
        let dataToUpdate:UpdateUserBody={}
        if(password){
            let hashPassword = await bcrypt.hash(password, saltRound)
            dataToUpdate.password=hashPassword
        }
        if(gender){
            dataToUpdate.gender=gender
        }
        if(name){
            dataToUpdate.name=name
        }
        let userData = await prisma.user.update({
            where:{id:userId},
            data: dataToUpdate
        })
        console.log("step check")
        res.send({ message: predefinetext.RESOURCE_UPDATED, userData: userData })
    } catch (err) {
        console.log("error catch in register user")
        next(err)
    }
}
export const loginUser_service = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("login body", req.body)
        let { email, password } = req.body as LoginBodyType
        let userData = await prisma.user.findUnique({ where: { email } })
        if (!userData) {
            return res.status(400).json({ message: predefinetext.USER_NOT_FOUND })
        }

        const isMatch = await bcrypt.compare(password, userData.password)

        if (!isMatch) {
            return res.status(401).json({ message: predefinetext.WRONG_PASSWORD })
        }

        let token = jwt.sign({ id: userData.id, name: userData.name }, JWT_KEY, { expiresIn: "3d" })
        let { name, gender, id, status ,role} = userData
        return res.status(200).json({
            message: "Login Successfully",
            token: token,
            email, name, gender, id, status,role
        })
    } catch (err) {
        next(err)
    }

}


export const resetPassword_service = (req: Request, res: Response) => { }
export const logout_service = (req: Request, res: Response, next: NextFunction) => {

}
export const getUser_service = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { name, page, status, pageSize, userId } = req.body as userSeachBody
        let where: any = { status: "ACTIVE" }
        if (userId) where.userId = userId
        if (name) where.name = {
            contains: name,     // partial match
            mode: "insensitive" // case-insensitive search
        };
        // if (status) where.status = status
        

        let take = pageSize || 10
        let skip = page - 1 || 1

        let userData = await prisma.user.findMany({ where, take, skip, orderBy: { createdAt: "desc" } })
        console.log("userData",userData)
        let totalCount = await prisma.user.count({ where, orderBy: { createdAt: "desc" } })
        res.status(200).json({ message: predefinetext.RESOURCE_FETCHED, userData, totalCount, page: page,pageSize:pageSize||0, skip, totalPage: Math.ceil(totalCount / take) })
    } catch (err) {
        next(err)
    }
}
export const getUserById_service = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.params", req.params)
        let userId = parseInt(req.params.id, 10)

        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        let userData = await prisma.user.findUnique({ where: { id: userId } })
        return res.status(200).json({ userData })
    } catch (err) {
        console.log(err, "err")
        next(err)
    }
}
export const deleteUserById_service = (req: Request, res: Response) => { }
export const getUsers_service = (req: Request, res: Response) => { }



