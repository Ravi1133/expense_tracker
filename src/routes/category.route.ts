import { Router } from "express";
import {addCategories,getCategories, updateCategories} from "../controllers/categories"
import { validateToken } from "../utils/utliFunction";
import { validateAddCategoryBody, validateUpdateCategoryBody } from "../utils/validators";
export const categoryRouter=Router()
categoryRouter.post("/addCategory",validateToken,validateAddCategoryBody, addCategories)
categoryRouter.get("/getCategories",validateToken, getCategories)
categoryRouter.patch("/updateCategory/:id",validateToken,validateUpdateCategoryBody, updateCategories)


