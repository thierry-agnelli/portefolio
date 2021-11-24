// Dépendances
import express from "express";
// Controlleur
import userController from "../controllers/user.js";

/* Création Route */
const userRoute = express.Router();

/* Path route user */
// Création compte
userRoute.post("/registration", userController.registration);
// Validation compte
userRoute.put("/account-validation", userController.AccountValidation);
// Connexion
userRoute.post("/login", userController.authentification);
// Validation token d'authentification
userRoute.get("/authToken-validation/:token", userController.authTokenValidation);
// Vérification token valid
userRoute.get("/token-validation/:token", userController.validToken);
// Reset du password
userRoute.post("/reset-password", userController.resetPassword);
// Changement de mot de passe
userRoute.put("/change-password", userController.changePassword);
// Renvoi e-mail de validation
userRoute.post("/validation-mail", userController.resendValidationMail);
// Vérification si l'utilsiateur est un administrateur
userRoute.get("/is-admin/:token", userController.isAdmin);

export default userRoute;

