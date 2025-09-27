import { Timestamp } from "bson";
import { time } from "console";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    },{ Timestamps: true });
    const User = mongoose.model("user", userSchema);
    