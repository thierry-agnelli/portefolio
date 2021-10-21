// Dépendances
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    Category: { type: String, require: true },
    Order: {type: Number, required: true},
    Name: { type: String, unique: true, required: true },
}, { collection: "Skills" });

export default mongoose.model("Skills", skillSchema);
