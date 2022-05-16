import path from 'path'

const GET = (req, res) => {

    let users = req.readFile('users')
    let messages = req.readFile('messages')



    for (let message of messages) {
        for (let user of users) {
            if (message.userId == user.userId) {
                message.username = user.username
                message.profileImg = process.HOST + "/profile/" + user.profileImg
                delete message.userId
                if(message.messageFile){
                    message.view = process.HOST + "/view/" + message.messageFile
                    message.download = process.HOST + "/download/" + message.messageFile
                    delete message.messageFile
                }
                
            }
        }
    }

    return res.status(200).json(messages)
}



const POST = (req, res) => {
    try {

        let Formats = [
            '.png', '.jpg', '.jpeg', '.svg', '.webp', '.mp4', '.webm', '.gif',
            '.doc', '.docx', '.pdf'
        ]

        const messages = req.readFile("messages")

        let body = req.body

        body.messageId = messages.length ? messages.at(-1).messageId + 1 : 1
        body.userId = req.userId
        body.messageFile = req.files ? Date.now() + req.files.rasm.name : null
        body.messageText = body.messageText || null
        body.messageDate = new Date().toLocaleTimeString()
        

        if (!!body.messageText == !!body.messageFile) {
            throw new Error('Invalid')
        }

        if (req.ip != req.myIp || req.agent != req.headers['user-agent']) {
            throw new Error('Invalid device')
        }

        if (body.messageFile && !Formats.includes(path.extname(body.messageFile))) {
            throw new Error('Invalid format')
        }

        if (body.messageFile) {
            req.files.rasm.mv(path.join(process.cwd(), 'src', 'uploads', 'files', body.messageFile))
        }

        messages.push(body)

        req.writeFile('messages', messages)


        res.status(200).json({
            status: 200,
            message: "Successful message sent",
            data: body
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }



}


export default {
    GET, POST
}