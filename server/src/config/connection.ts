import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error('Environment variable MONGODB_URI is not defined');
}

const MONGODB_URI: string = process.env.MONGODB_URI;
console.log(`MONGODB_URI: ${MONGODB_URI}`);


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
