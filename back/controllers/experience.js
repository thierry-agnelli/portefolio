// Modèles
import Experience from "../models/Experience.js";
// Lib
import { promptLog } from "../lib/logs.js";

/* Contrôleur Expériences */
const experienceController = {
    getAll: (req, res) => {
        promptLog("Getting all experiences info", "yellow");
        
        Experience.find().sort("-order")
        .then(result => {
            promptLog("Experience data found", "green");
            res.status(200).json(result);
        })
        .catch(err => {
            promptLog(err, "red");
            res.status(400).send("No data found");
        });

    }
};

export default experienceController;