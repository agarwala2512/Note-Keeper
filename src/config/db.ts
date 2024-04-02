import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB Connected....");
    } catch (err) {
        console.error('ERROR HAS BEEN GENERATED : ', (err as Error).message);
        process.exit(1);
    }
}

export default connectDB;