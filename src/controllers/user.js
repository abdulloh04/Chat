import sha256 from 'sha256'
import JWT from '../utils/jwt.js'
import path from 'path'

const GET = (req, res) => {

    let users = req.readFile('users')
    users.forEach(val => {
        val.profileImg = process.HOST + "/profile/" + val.profileImg
        console.log(val.profileImg);
    })

    

    return res.status(200).json(users)
}


export default {
    GET 
}