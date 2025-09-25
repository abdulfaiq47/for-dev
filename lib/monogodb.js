import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MonogoDb Connected........")
    } catch (error) {
        console.log(error)

    }
}