import { Router } from "express";
import {addCategories,getCategories, updateCategories} from "../controllers/categories"
import { validateToken } from "../utils/utliFunction";
import { validateAddCategoryBody, validateUpdateCategoryBody } from "../utils/validators";
export const categoryRouter=Router()
/**
 * @openapi
 * /userAuth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - User Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: shashi123@gmail.com
 *               password:
 *                 type: string
 *                 example: Ravikant@1234
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
categoryRouter.post("/addCategory",validateToken,validateAddCategoryBody, addCategories)
categoryRouter.get("/getCategories",validateToken, getCategories)
categoryRouter.patch("/updateCategory/:id",validateToken,validateUpdateCategoryBody, updateCategories)


