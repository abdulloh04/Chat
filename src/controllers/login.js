import sha256 from 'sha256'
import JWT from '../utils/jwt.js'
import path from 'path'


const LOGIN = (req, res) => {
    const { username, password } = req.body
    
    let users = req.readFile('users')
    console.log('ss');
    let user = users.find(user => user.username == username && user.password == sha256(password))

    if(!user) {
        return res.status(400).json({
            status: 400,
            message: "Wrong password or username!"
        })
    }

    return res.status(200).json({
        status: 200,
        message: "The user logged in succssesfully!",
        token: JWT.sign({ userId: user.userId, agent: req.headers['user-agent'], ip: req.ip }) 
    })
}





const REGISTER = (req, res) => {
    const users = req.readFile('users')

    req.body.profileImg = Date.now() + req.files.rasm.name.trim()

    req.body.userId = users.length ? users.at(-1).userId + 1 : 1
    req.body.password = sha256(req.body.password)

    const user = users.find(user => user.username == req.body.username)

    const email = users.find(user => user.email == req.body.email)

    if (user) {
        return res.status(400).json({
            status: 400,
            message: "The user already exists!"
        })
    }


    if(email){
        return res.status(400).json({
            status: 400,
            message: "The email already exists!"
        })
    }

    req.body.username = req.body.username.toLowerCase()

    users.push(req.body)

    req.writeFile('users', users)
    
    req.files.rasm.mv(path.join(process.cwd(), 'src', 'uploads', 'avatar',  req.body.profileImg))

    delete req.body.password

    return res.status(200).json({
        status: 200,
        message: "The user successfully registered!",
        token: JWT.sign({ userId: req.body.userId, agent: req.headers['user-agent'], ip: req.ip }),
        data: req.body
    })

}



export default {
    LOGIN, REGISTER
}