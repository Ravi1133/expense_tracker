import { NextFunction, Request, Response } from "express";
import * as Joi from "joi"
import { TransactionType } from "./enums";

export const registerUserSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 50 characters",
        "any.required": "Name is required",
    }),

    email: Joi.string().trim().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),

    gender: Joi.string().valid("male", "female").required().messages({
        "any.only": "Gender must be either male or female",
        "any.required": "Gender is required",
    }),

    password: Joi.string().trim().min(6).max(100).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password cannot exceed 100 characters",
        "any.required": "Password is required",
    }),
}).required()
export const updateUserSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).optional().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 50 characters",
        "any.required": "Name is required",
    }),

    gender: Joi.string().valid("male", "female").optional().messages({
        "any.only": "Gender must be either male or female",
        "any.required": "Gender is required",
    }),

    password: Joi.string().trim().min(6).max(100).optional().messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password cannot exceed 100 characters",
        "any.required": "Password is required",
    }),
}).required()

export const loginBody=Joi.object({
    email:Joi.string().required().messages({
        "any.required": "Email is required",
    }),
    password:Joi.string().required().messages({
        "any.required": "Password is required",
    })
}).required()

export const addTransactionSchema=Joi.object({
    categoryId:Joi.number().required().messages({
        "any.required": "categoryId is required",
    }),
    userId:Joi.number().required().messages({
        "any.required": "userId is required",
    }),
    amount:Joi.number().required().messages({
        "any.required": "Amount is required",
    }),
    type:Joi.string().required().valid(TransactionType.EXPENSE,TransactionType.INCOME).messages({
        "any.required":"type is required",
        "any.only":"INCOME and EXPENSE are allowe in Feild"
    }),
    transactionDate:Joi.date().required().max(new Date()).messages({
        "any.required":"Transaction Date is required"
    }),
    description:Joi.string().max(300)
}).required()

export const updateTransactionSchema=Joi.object({
    id:Joi.number().required().messages({
        "any.required": "id is required",
    }),
    categoryId:Joi.number().optional(),
    amount:Joi.number().optional().messages({
        "any.required": "Amount is required",
    }),
    type:Joi.string().optional().valid(TransactionType.EXPENSE,TransactionType.INCOME).messages({
        "any.required":"type is required",
        "any.only":"INCOME and EXPENSE are allowe in Feild"
    }),
    transactionDate:Joi.date().optional().max(new Date()).messages({
        "any.required":"Transaction Date is required"
    }),
    description:Joi.string().max(300)
}).required()

export const addCategorySchema=Joi.object({
    name:Joi.string().required().messages({
        "any.required": "Name is required",
    }),
    type:Joi.string().required().valid(TransactionType.EXPENSE,TransactionType.INCOME).messages({
        "any.required":"type is required",
        "any.only":"INCOME and EXPENSE are allowe in Feild"
    })
}).required()

export const updateCategorySchema=Joi.object({
    name:Joi.string().optional(),
    type:Joi.string().optional().valid(TransactionType.EXPENSE,TransactionType.INCOME).messages({
        "any.only":"INCOME and EXPENSE are allowe in Feild"
    })
}).min(1).required()

export const transactionSearch=Joi.object({
    userId:Joi.number().optional(),
    categoryId:Joi.number().optional(),
    amount:Joi.number().optional(),
    startDate:Joi.date().optional(),
    endtDate:Joi.date().optional(),
    page:Joi.number().optional(),
    pageSize:Joi.number().optional(),

}).required()
export const transactionSearchUser=Joi.object({
    userId:Joi.number().optional(),
    categoryId:Joi.number().optional(),
    amount:Joi.number().optional(),
    date:Joi.date().optional(),
    page:Joi.number().optional(),
    pageSize:Joi.number().optional(),

}).required()

export const userSearch=Joi.object({
    userId:Joi.number().optional(),
    gender:Joi.string().optional(),
    name:Joi.string().optional(),
    status:Joi.string().valid("ACTIVE","INACTIVE").optional(),
    page:Joi.number().optional(),
    pageSize:Joi.number().optional(),

}).required()

export const validateUserSearch = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = userSearch.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateUpdateUser = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = updateUserSchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateTransactionSearch = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = transactionSearch.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateUpdateTransaction = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = updateTransactionSchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}

export const validateRegisterBody = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = registerUserSchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateLoginBody = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = loginBody.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateAddTransactionBody = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = addTransactionSchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}
export const validateAddCategoryBody = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = addCategorySchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}

export const validateUpdateCategoryBody = (req: Request, res: Response, next:NextFunction) => {
    let { error, value } = updateCategorySchema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true
    })
     if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }
    next()
}