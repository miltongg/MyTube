import express from 'express'
import './database.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js"
import videoRoutes from "./routes/video.routes.js"
import commentRoutes from "./routes/comment.routes.js";
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

const app = express()
dotenv.config()


const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/', authRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/video/', videoRoutes)
app.use('/api/comment/', commentRoutes)

app.listen(port, () => {
    console.log('Server running on port:', port)
})