// Dépendances
import express from "express";
// Contrôleur
import infoController from "../controllers/info.js";


// Création Router Infos
const infoRouter = express.Router();

/* Routes */
infoRouter.get("/get-all", infoController.getAll);


export default infoRouter;