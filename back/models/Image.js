// Dépendances
import mongoose from "mongoose";

// Schema image
const imageSchema = new mongoose.Schema({
    name : {type: String, require: true, unique : true},
    binary : {type: Buffer, require : true},
    contentType: {type: String, require: true}
}, {collection : "Images"});

export default mongoose.model("Images", imageSchema);