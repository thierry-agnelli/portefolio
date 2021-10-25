// Dépendances
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    message: {type: String, required: true},
    read: {type: Boolean, default: false}
}, {collection: "Messages"});

export default mongoose.model("Messages", messageSchema);