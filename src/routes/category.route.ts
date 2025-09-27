import { Router } from "express";
import {addCategories,getCategories} from "../controllers/categories"
import { validateToken } from "../utils/utliFunction";
import { validateAddCategoryBody } from "../utils/validators";
export const categoryRouter=Router()
categoryRouter.post("/addCategory",validateToken,validateAddCategoryBody, addCategories)
categoryRouter.get("/getCategories",validateToken, getCategories)

