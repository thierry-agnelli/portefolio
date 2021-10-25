// Dépendances
import express from "express";
// Contôleur
import messageController from "../controllers/message.js";


/* Création Route */
const messageRouter = express.Router();

/* Routes */
messageRouter.post("/send", messageController.receiveMessage);


export default messageRouter;