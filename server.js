import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connect } from 'mongoose'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'

//config env
dotenv.config()

//config database
connectDB()

const app = express()

//middlewares 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy ở chế độ ${process.env.DEV_MODE} trên cổng ${PORT}`.bgCyan.white)
})