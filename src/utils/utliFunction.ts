import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken"
import { userBody } from "./interfaces";
import { predefinetext } from "./predefineText";
const JWT_KEY = process.env.SECREATE_KEY || "mykey"


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization
        token = token?.replace("Bearer ", "") || ""
        if(!token)return res.status(401).json({message:predefinetext.NEED_CREDENTIALS})
        let userData = Jwt.verify(token, JWT_KEY) as userBody
        req.user = userData
        next()
    } catch (err) {
        throw Error(predefinetext.SOMETHING_WENT_WRONG)
    }
}