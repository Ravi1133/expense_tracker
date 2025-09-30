import { Router } from "express";
import { getUserById, getUsers, loginUser, registerUser, updateUser } from "../controllers/user_and_auth";
import { validateLoginBody, validateRegisterBody, validateUpdateUser, validateUserSearch } from "../utils/validators";
import { validateToken } from "../utils/utliFunction";

export const userAndauthRouter=Router()
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
userAndauthRouter.post("/register",validateRegisterBody,registerUser)
userAndauthRouter.post("/login",validateLoginBody,loginUser)
userAndauthRouter.patch("/updateUser",validateToken,validateUpdateUser,updateUser)

// userAndauthRouter.post("/logout",validateLoginBody,logoutUser)

userAndauthRouter.get("/getUserById/:id",validateToken,getUserById)
userAndauthRouter.post("/getUsers",validateToken,validateUserSearch,getUsers)



