import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
	options: [{     
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
          
	}],
}, { versionKey: false })
