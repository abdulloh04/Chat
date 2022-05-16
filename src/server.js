import express from "express"
import fileUpload from "express-fileupload"
import path from "path"
import os from "os"
import fs from "fs"
import "../config.js"
import modelMiddleWare from "./middlewares/model.js"
const app = express()
console.log();


process.PORT = process.env.PORT || 7000

try {
    process.IPV4 = os.networkInterfaces()['wls1'][0].address
} catch (error) {
    process.IPV4 = os.networkInterfaces()['wlp0s20f3'][0].address
}


process.HOST = 'http://' + process.IPV4 + ':' + process.PORT




import loginRouter from "./routes/login.js"
import userRouter from "./routes/users.js"
import messageRouter from "./routes/messages.js"

app.use(express.json())
app.use(fileUpload())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', '*');

    res.setHeader('Access-Control-Allow-Headers', '*');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(modelMiddleWare.middleware({ databasePath: path.join(process.cwd(), 'src', 'database') }))



app.use(loginRouter)
app.use(userRouter)
app.use(messageRouter)




app.get('/download/:fileName', (req, res) => {
    res.download(path.join(process.cwd() , 'src', 'uploads', 'files', req.params.fileName))
})
app.get("/profile/:fileName", (req, res) => {
    console.log(path.join(process.cwd() , 'src', 'uploads', 'avatar', req.params.fileName));
    // console.log(req.params.fileName);
    res.sendFile(path.join(process.cwd() , 'src', 'uploads', 'avatar', req.params.fileName))
})
app.get('/view/:fileName', (req, res) => {

    res.sendFile(path.join(process.cwd() , 'src', 'uploads', 'files', req.params.fileName))
})




console.clear();
app.listen(process.PORT, () => console.log(process.HOST))