import { Router } from "express";
import {signUp,activateUser} from "../controllers/UserController"
// const UserController = require("../controllers/UserController");

const router = Router();
router.post("/signup", signUp);
router.post("/activate-user", activateUser);
export default router;
