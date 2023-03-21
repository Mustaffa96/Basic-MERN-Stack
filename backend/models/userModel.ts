import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends mongoose.Document {
    name: String,
    username: String,
    email: String,
    contact: String,
    dob: String,
    image: String,
    password: String,
    isAdmin: boolean,
    matchPassword(enteredPassword: any);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false,
      },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<IUser>('User', userSchema)

export default User