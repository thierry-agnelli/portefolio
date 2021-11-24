// Dépendances
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Config
import config from "../config.js";
// Modèle
import User from "../models/User.js"
// Lib
import { accountValidationMail } from "../lib/mailing.js"
import { resetPasswordMail } from "../lib/mailing.js";
import { promptLog } from "../lib/logs.js";


/* Contrôler user */
const userController = {
  // Enregistrement nouvel utilisateur
  registration: (req, res) => {
    promptLog("User registration request received", "yellow")

    // Hashage password
    const salt = bcrypt.genSaltSync(config.SALT_VALUE);
    const hashedPwd = bcrypt.hashSync(req.body.pwd, salt);

    // Génération token pour lien de validation
    const token = jwt.sign({ id: req.body.email }, config.KEY);

    // Date d'inscription format dd//mm/yyyy
    const today = new Date().toISOString().split('T')[0].split("-");
    const frDate = `${today[2]}/${today[1]}/${today[0]}`;

    // Création new User
    const newUser = new User({
      email: req.body.email,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      company: req.body.company,
      address: req.body.address,
      postCode: req.body.postCode,
      city: req.body.city,
      phoneNumber: req.body.phone,
      hashedPwd: hashedPwd,
      registrationDate: frDate,
      newsLetter: req.body.newsLetter,
      validated: token
    });

    // Enregistrement newUser
    newUser.save(req.body)
      .then(() => {
        accountValidationMail(newUser)
          .then(result => {
            promptLog(`Result: ${result}`, "green");
            res.status(200).send("user registration successful");
          });
      })
      .catch((err) => {
        promptLog(err.message, "red");

        //Gestion des erreurs
        if (err.code && err.code === 11000)
          res.status(400).send("Cet e-mail existe déjà.");
        else
          res.status(400).send("Une erreur est survenue.");
      });
  },
  // Va&lidation du compte
  AccountValidation: (req, res) => {
    promptLog("Account validation", "yellow");
    // Validation du compte
    User.updateOne({ validated: req.body.validationToken }, { validated: true })
      .then(result => {

        if (result.n !== 0) {
          promptLog(`Account : ${result.email}`);
          promptLog("Account validated", "green");
          res.status(200).send("Account validated");
        }
        else {
          throw "No account to validate has been found.";
        }
      })
      .catch(err => {
        promptLog(err, "red");
        res.status(404).send("No account to validate has been found.");
      });
  },
  // Authentification connexion
  authentification: (req, res) => {
    promptLog(`login attempt: ${req.body.email}`, "yellow");

    User.findOne({ email: req.body.email })
      .then(result => {
        // Si un utilisateur a été trouvé
        if (result) {
          promptLog("User found", "yellow");
          // Vérification mot de passe
          if (bcrypt.compareSync(req.body.pwd, result.hashedPwd)) {

            if (result.validated === "true") {
              // Génération token d'authentification
              let authentificationToken;

              if (req.body.stayLogged)
                authentificationToken = jwt.sign({ id: result._id }, config.KEY);
              else
                authentificationToken = jwt.sign({ id: result._id }, config.KEY, { expiresIn: "2h" });

              // Réponse
              res.status(200).json({
                id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                authToken: authentificationToken
              });
            }
            else
              throw 403;
          }
          else {
            throw 418;
          }
        }
        // Renvoie d'un message d'erreur
        else
          // throw "";
          throw 418;
      })
      .catch(err => {
        let message = "";
        let errCode = err;

        switch (err) {
          case 418:
            message = "email ou mot de passe incorrect";
            break;
          case 403:
            message = "Ce compte n'a pas encore été validé, un email vous a été envoyé verifiez vos spam.";
            break;
          default:
            errCode = 400;
            message = "Une erreur est survenue";
            break;
        };

        promptLog(message, "red");
        res.status(errCode).send(message);
      })
  },
  // Validation token
  authTokenValidation: (req, res) => {

    promptLog(`Authentification token: ${req.params.token}`, "yellow");

    // Vérification du token
    try {
      const isValidToken = jwt.verify(req.params.token, config.KEY);

      // Si token valid vérification si un user existe pour cet id
      User.findOne({ _id: isValidToken.id })
        .then((result) => {

          promptLog("Token is valid", "green");

          res.status(200).send("Token is valid");
        })
        // Si l'utilisateur n'a pas été trouvé 
        .catch((error) => {
          promptLog("User not found or invalid token", "red");

          res.status(400).send("User not found or invalid token");
        });
    }
    // Si la validation du token a échoué
    catch {
      res.status(400).send("User not found or invalid token");
    }
  },
  // Vérification de validité de token
  validToken: (req, res) => {
    promptLog(`Token validation: ${req.params.token}`, "yellow");
    // Vérification
    try {
      const isValidToken = jwt.verify(req.params.token, config.KEY);
      promptLog("Token is valid", "green");
      res.status(200).send("Token is valid");
    }
    catch {
      promptLog("Token is not valid", "red");
      res.status(400).send("Token is not valid");
    }
  },
  // Reset du mot de passe
  resetPassword: (req, res) => {
    promptLog(`Reset password request on mail : ${req.body.email}`, "yellow");
    // Vérification si l'adresse mail existe en base
    User.findOne({ email: req.body.email })
      .then(result => {
        resetPasswordMail(result);
      })
      .catch(err => {
        promptLog("Email not found", "red");
      });

    res.status(200).send("Mail sended");
  },
  // Changement de mot de passe
  changePassword: (req, res) => {
    try {
      // Vérification token
      const isValidToken = jwt.verify(req.body.token, config.KEY);
      // Génération mot de passe hashé
      const salt = bcrypt.genSaltSync(config.SALT_VALUE);
      const hashedPwd = bcrypt.hashSync(req.body.newPwd, salt);
      // Maj du mot de passe
      User.updateOne({ _id: isValidToken.id }, { hashedPwd: hashedPwd })
        .then(response => res.status(200).send("Update ok"))
        .catch(err => res.status(403).send("User not found"));
    }
    catch {
      res.status(403).send("Token is ont valid");
    }
  },
  // Renvoie e-mail de validation
  resendValidationMail: (req, res) => {
    promptLog(`Resend a validation to : ${req.body.email}`, "yellow");

    User.findOne({ email: req.body.email })
      .then(result => {
        if (result) {
          accountValidationMail(result)
            .then(result => {
              promptLog(`Result: ${result}`, "green");
              res.status(200).send("Un email vous a été renvoyé.");
            });
        }
        else
          throw "Error";
      })
      .catch(() => {
        promptLog("No account found with this email", "red")
        res.status(400).send("Vérifiez l'adresse mail.");
      });
  },
  isAdmin: (req, res) => {
    console.log("isAdmin?");
  }
}

export default userController;
