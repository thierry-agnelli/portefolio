// Dépendances
import express from "express";
// Contrôleur
import experienceController from "../controllers/experience.js";

// Création Routes
const experienceRouter = express.Router();

/* Routes */
experienceRouter.get("/get-all", experienceController.getAll);

export default experienceRouter;