import mongoose from "mongoose";

export const optionSchema = new mongoose.Schema({
    text: { type: String, required: true,},
    votes: { type: Number, default: 0,},
    link_to_vote: { type: String,},
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    }
}, {timestamps: true,})

