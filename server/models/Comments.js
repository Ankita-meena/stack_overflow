import mongoose from "mongoose";

const CommentsSchema = mongoose.Schema({
    userId: {type: String},
    email: {type: String},
    text: {type: String},
    date: {type: Date, default: Date.now },
    qid:{type: String},
    name: {type: String}
})

export default mongoose.model("Comments", CommentsSchema)