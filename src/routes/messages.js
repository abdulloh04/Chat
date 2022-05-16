import { Router } from "express";
import controller from "../controllers/message.js"
import checkToken from "../middlewares/checkToken.js";
import validation from "../middlewares/validation.js";

const router = Router()

router
    .get('/messages', checkToken, controller.GET)
    .post("/messages", checkToken, validation, controller.POST)

export default router