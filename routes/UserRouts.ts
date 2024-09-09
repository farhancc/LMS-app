import { Router } from "express";
import {signUp,activateUser, loginUser, logout, updateAccessToken, getUserInfo} from "../controllers/UserController"
import { autharizeRole, isAuthenticated } from "../middlewares/auth";
// const UserController = require("../controllers/UserController");

const router = Router();
router.post("/signup", signUp);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout",isAuthenticated,logout);
router.get("/refresh",updateAccessToken);
router.get("/me",isAuthenticated,getUserInfo);
export default router;
