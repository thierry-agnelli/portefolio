// Dépendaces
import express from "express";
// Contrôleur
import imageController from "../controllers/image.js";

// Router image
const imageRouter = new express.Router();

/* Path Route image */
imageRouter.get("/get-byname/:name", imageController.getByName);


export default imageRouter;