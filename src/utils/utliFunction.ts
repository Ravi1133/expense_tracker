import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken"
import { userBody } from "./interfaces";
import { predefinetext } from "./predefineText";
import { rateLimit ,ipKeyGenerator} from "express-rate-limit"

const JWT_KEY = process.env.SECREATE_KEY || "mykey"


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization
        token = token?.replace("Bearer ", "") || ""
        if (!token) return res.status(401).json({ message: predefinetext.NEED_CREDENTIALS })
        let userData = Jwt.verify(token, JWT_KEY) as userBody
        console.log("userData",userData)
        req.user = userData
        next()
    } catch (err) {
        throw Error(predefinetext.SOMETHING_WENT_WRONG)
    }
}

const tokenOrIPKeyGenerator = (req: Request) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (token) return token;

  // Fallback to IP (works for IPv4 and IPv6)
  return req.ip || req.socket.remoteAddress || '';
};

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyGenerator: tokenOrIPKeyGenerator,
});

export const transactionRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    keyGenerator: tokenOrIPKeyGenerator,
});