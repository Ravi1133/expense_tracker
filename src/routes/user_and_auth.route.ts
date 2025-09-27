import { Router } from "express";
import { getUser, getUserById, loginUser, registerUser } from "../controllers/user_and_auth";
import { validateLoginBody, validateRegisterBody } from "../utils/validators";
import { validateToken } from "../utils/utliFunction";

export const userAndauthRouter=Router()
userAndauthRouter.post("/register",validateRegisterBody,registerUser)
userAndauthRouter.post("/login",validateLoginBody,loginUser)
userAndauthRouter.get("/getUserById/:id",validateToken,getUserById)


