import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from "./config/db";

import userRoutes from './routes/userRoutes'
import uploadRoutes from './routes/uploadRoutes'

dotenv.config();

connectDB();

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/users', userRoutes)

//const __dirname = path.resolve()
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 5000

app.listen(
    PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    });

