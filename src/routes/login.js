import { Router } from "express";
import controller from "../controllers/login.js"
import validation from "../middlewares/validation.js";

const router = Router()

router
    .post('/login', validation, controller.LOGIN)
    .post('/register', validation, controller.REGISTER)

export default router