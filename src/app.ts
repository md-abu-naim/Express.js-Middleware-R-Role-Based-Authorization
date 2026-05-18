import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/user/user.route"
import { profileRouter } from "./modules/profile/profile.route"
import { authRouter } from "./modules/auth/auth.router"
import fs from 'fs'
const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log('Method - URL - Time:', req.method, req.url, Date.now())

    const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`

    fs.appendFile("logger.txt", log, (error) => {
        console.log(error);
    })

    next()
})

app.get('/api/', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Express Server",
        "author": "Mohammad Abu Naim"
    })
})

app.use('/api/users', userRoute)

app.use('/api/profile', profileRouter)

app.use('/api/auth', authRouter)


export default app