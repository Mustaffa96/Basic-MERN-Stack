import bcrypt from "bcryptjs"



const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Ali',
        email: 'ali@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Abu',
        email: 'abu@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Atan',
        email: 'atan@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Bakar',
        email: 'bakar@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
]

export default users