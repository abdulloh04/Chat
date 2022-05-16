import { Router } from "express";
import controller from "../controllers/user.js"
import checkToken from "../middlewares/checkToken.js";

const router = Router()

router
    .get('/users', checkToken, controller.GET)

export default router