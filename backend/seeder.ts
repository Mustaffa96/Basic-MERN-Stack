import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users'
import User from './models/userModel'
import connectDB from './config/db'
import { setDefaultResultOrder } from 'dns'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        console.log('Data imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroytData = async () => {
    try {
        await User.deleteMany()


        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroytData()
} else {
    importData()
}