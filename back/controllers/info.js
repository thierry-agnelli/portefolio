// Modèles
import Skill from "../models/Skill.js";
import Qualification from "../models/Qualification.js";
// Lib
import { promptLog } from "../lib/logs.js";

/* Contrôleur infos */
const infoController = {
    getAll: (req, res) => {
        promptLog("Getting all skills info", "yellow");
        let skills = null;
        let qualifications = null;

        // Recherche en base des données des infos qualifications et compétences
        Qualification.find().sort("-year")
            .then(results => {
                if (results) {
                    promptLog("Qualification data found", "green");
                    qualifications = results;
                    // Recherche en base des données des infos compétences
                    Skill.find()
                        .then(results => {
                            if (results) {
                                promptLog("Skills data found", "green");
                                skills = results;
                                res.status(200).json({
                                    qualifications: qualifications,
                                    skills: skills
                                })
                            }
                            else
                                promptLog("No data found", "red");

                        });
                }
                else
                    promptLog("No data found", "red");
            });
    },
};

export default infoController;
