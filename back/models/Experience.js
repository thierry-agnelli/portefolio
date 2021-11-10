// Dépendances
import mongoose from "mongoose";

const experiencesSchema = new mongoose.Schema({
    order: {type: Number, unique: true, require: true},
    startDate: {type: String, require: true},
    endDate: String,
    society: {type: String, require: true},
    job: {type: String, require: true},
    responsability: {type: Array, require: true, default:[]}
}, {collection: "Experiences"});

export default mongoose.model("Experiences", experiencesSchema);