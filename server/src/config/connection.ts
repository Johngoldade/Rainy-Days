import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || ''

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("🗄️ Database connected!")
        return mongoose.connection
    } catch (r) {
        console.error('Error connecting to the database', r)
        throw new Error ('DB connection failed 😩')
    }
}

;

export default db;
