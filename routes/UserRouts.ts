import { Router } from "express";
import {signUp,activateUser, loginUser, logout, updateAccessToken, getUserInfo, socialAuth, updateUserinfo, updatePassword, updateProfilePicture, getAllUsers, updateRole, deleteUser} from "../controllers/UserController"
import { autharizeRole, isAuthenticated } from "../middlewares/auth";
// const UserController = require("../controllers/UserController");

const router = Router();
router.post("/signup", signUp);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout",isAuthenticated,logout);
router.get("/refresh",updateAccessToken);
router.get("/me",isAuthenticated,getUserInfo);
router.post('/social-auth',socialAuth)
router.put("/update-user",isAuthenticated,updateUserinfo)
router.put("/update-password",isAuthenticated,updatePassword)
router.put("/update-dp",isAuthenticated,updateProfilePicture)
router.get('/users',isAuthenticated ,autharizeRole('admin'),getAllUsers)
router.delete('/users',isAuthenticated ,autharizeRole('admin'),deleteUser)

router.put('/role',isAuthenticated,updateRole)
export default router;
