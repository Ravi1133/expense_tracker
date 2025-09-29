import { Router } from "express";
import { getUserById, getUsers, loginUser, registerUser, updateUser } from "../controllers/user_and_auth";
import { validateLoginBody, validateRegisterBody, validateUpdateUser, validateUserSearch } from "../utils/validators";
import { validateToken } from "../utils/utliFunction";

export const userAndauthRouter=Router()
userAndauthRouter.post("/register",validateRegisterBody,registerUser)
userAndauthRouter.post("/login",validateLoginBody,loginUser)
userAndauthRouter.patch("/updateUser",validateToken,validateUpdateUser,updateUser)

// userAndauthRouter.post("/logout",validateLoginBody,logoutUser)

userAndauthRouter.get("/getUserById/:id",validateToken,getUserById)
userAndauthRouter.post("/getUsers",validateToken,validateUserSearch,getUsers)



