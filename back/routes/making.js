// Dépendaces
import express from "express";
// COntrôleur
import makingController from "../controllers/making.js";

// Router Making
const makingRouter = new express.Router();

/* Path Route making */
// Toutes les entrées
makingRouter.get("/get-all", makingController.getAll);



export default makingRouter;