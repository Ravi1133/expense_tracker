import e, { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err,"err inhandler")
    if (err.code == "P2002") {
        console.log("came inside")
        return res.status(400).json({
            error: "Unique constraint failed",
            details: `Duplicate value for field :${err.meta?.target}`
        })
    }
    if (err.code == "P2003") {
        console.log("came inside")
        return res.status(400).json({
            error: "Invalid  Operation",
            details: `Invalid Operation`
        })
    }
    
    return res.status(500).json({
        error: "Internal server error",
        message: err.message || "Something went wrong",
    });
}