import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean,

        default: false
    },
}, { timestamps: true })

const User = models.user || mongoose.model("user", userSchema)

export default User;