// Dépendances
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    lastName: { type: String, require: true },
    firstName: String,
    company: String,
    address: String,
    postCode: String,
    city: String,
    phoneNumber: String,
    hashedPwd: { type: String, required: true },
    rank: { type: String, default: "Utilisateur" },
    registrationDate: { type: String, required: true },
    newsLetter: { type: Boolean, required: true },
    validated: { type: String, required: true },
}, { collection: "Users" });

export default mongoose.model("Users", userSchema);
