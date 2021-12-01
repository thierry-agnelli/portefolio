// Dépendances
import mongoose from "mongoose";

// Schéma Réalisations
const makingSchema = new mongoose.Schema({
    title: {type: String, require: true, unique : true},
    link: {type: String, require : true},
    details: {type: String, require: true},
    pictureName: {type: String},
    uploadingDate: Date
}, {collection: "Makings"});

export  default mongoose.model("Makings", makingSchema);