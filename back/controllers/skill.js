// Modèle
import Skill from "../models/Skill.js";
// Lib
import { promptLog } from "../lib/logs.js";


/* Contrôler user */
const skillControleur = {
    // Récupération des infos compétences
    getSkillsInfos: (req, res) => {
        promptLog("Getting all skills infos", "yellow");

        // Recherche en base des données des infos compétences
        Skill.find()
            .then(results => {
                if (results){
                    promptLog("Skill category data found", "green");
                    res.status(200).json(results);
                }
                else {
                    promptLog("No data found", "red");
                    res.status(400).send("No data found");
                }
            });

    },
};

export default skillControleur;