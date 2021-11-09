// Dépendances
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    category: { type: String, require: true },
    order: {type: Number, required: true},
    name: { type: String, unique: true, required: true },
    info: String
}, { collection: "Skills" });

export default mongoose.model("Skills", skillSchema);
