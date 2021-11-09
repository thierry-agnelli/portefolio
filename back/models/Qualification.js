// Dépendances
import mongoose from "mongoose";

const qualificationsSchema = new mongoose.Schema({
    year: {type: Number, required: true},
    title: {type: String, required: true},
    institution: String,
    city: String
}, {collection: "Qualifications"});

export default mongoose.model("Qualifications", qualificationsSchema);