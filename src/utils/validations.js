import Joi from 'joi'

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(30).alphanum().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{4,8}$/).required(),
    email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
})

export const messageSchema = Joi.object({
    messageText:Joi.string().min(1).max(200)
})


