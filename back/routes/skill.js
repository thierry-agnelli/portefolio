// Dépendances
import express from "express";
// Controlleur
import skillControleur from "../controllers/skill.js";
import userController from "../controllers/user.js";

/* Création Route */
const skillRoute = express.Router();

/* Path route user */
// Récupération des infos Compétences
skillRoute.get("/getSkillInfos", skillControleur.getSkillsInfos);

export default skillRoute;