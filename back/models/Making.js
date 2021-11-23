import mongoose from "mongoose";

const makingSchema = new mongoose.Schema({
    name: {type: String, require: true}
}, {collection: "Makings"});

export  default mongoose.model("Makings", makingSchema);