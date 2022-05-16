import { loginSchema, registerSchema, messageSchema } from "../utils/validations.js"

export default (req, res, next) => {
    if (req.url == '/login') {
        const { error } = loginSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }
    if (req.url == '/register') {
        if(!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Profile image required!"
            })
        }
        const { mimetype } = req.files.rasm
        // console.log(mimetype);
        if(!req.files || !['image/jpeg', 'image/jpg', 'image/png'].includes(mimetype)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid image format!"
            })
        }
        const { error } = registerSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    if(req.url == "/messages" && req.method == 'POST'){
        const { error } = messageSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    return next()

}