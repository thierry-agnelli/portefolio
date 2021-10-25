// Dépendances
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// Lib
import { promptLog } from "../lib/logs.js";
// Config
import config from "../config.js";

// Création du transporter pour envoie des mails
const transporter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: false,
    auth: {
        user: config.EMAIL, // generated ethereal user
        pass: config.MAIL_PASS, // generated ethereal password
    }
});
// Informations de l'expéditeur
const senderInfos = {
    name: config.SENDER_NAME,
    address: config.EMAIL
}

// Adresse Front
const buttonStyle = `background-color:#B04541;
color:black;padding:0.75em;
border-radius: 2em;
margin-bottom:4em;
text-decoration:none;
margin:0 10em;`;


// Mail de validation du compte crée
export const accountValidationMail = accountInfos => {

    return new Promise((resolve, reject) => {
        promptLog("Account verification mailing", "yellow");

        // Mail infos
        const mailOptions = {
            from: senderInfos, // Infos expéditeur
            to: accountInfos.email, // Liste de reception
            subject: "Bienvenue", // Objet
            html: `
                <div>
                    <p>Bonjour M/Mme ${accountInfos.lastName}</p>
                    <br/>
                    <p>Vous venez de vous inscrire sur mon site, bienvenue à vous.</p>
                    <p>Merci de cliquer sur ce lien pour valider votre compte :</p>
                    <div style="display:flex">
                        <a href="${config.FRONT_URL}/account-validation/${accountInfos.validated}" style="${buttonStyle}">Validation du compte</a>
                    </div>
                    <br/>
                    <div><i>Thierry Agnelli</i></div>
                    <div><i>Développeur Fullstack Javascript/React/React Native/Node...etc </i></div>
                </div>`
        };
        
        // Envoi du mail
        transporter.sendMail(mailOptions, (err, data) => {
            promptLog("Sending mail", "yellow");
            if (err)
                reject(err);
            else {
                promptLog("email sended", "green");
                resolve("email sended");
            }
        });
    });
};

// Mail de reset du password
export const resetPasswordMail = accountInfos => {
    // Génération token
    const token = jwt.sign({ id: accountInfos._id }, config.KEY, { expiresIn: 1800 });

    // Mail infos
    const mailOptions = {
        from: senderInfos, // Infos expéditeur
        to: accountInfos.email, // Liste de reception
        subject: "Demande de réinitialisation de mot de passe", // Objet
        html: `
            <div>
                <p>Bonjour M/Mme ${accountInfos.lastName}</p>
                <br/>
                <p>Vous venez de vous faire une demande de réinitialisation de mot de passe.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, faites attention à vérifier vos mots de passes.</p>
                <br/>
                <p>Pour réinitialiser le mot de passe veuillez suivre ce lien (lien valide pendant 30mn):</p>
                <div style="display:flex">
                    <a href="${config.FRONT_URL}/reset-password/${token}" style="${buttonStyle}">Réinitialisation du mot de passe</a>
                </div>
                <br/>
                <div><i>Thierry Agnelli</i></div>
                <div><i>Développeur Fullstack Javascript/React/React Native/Node...etc </i></div>
            </div>`
    };
        
    // Envoi du mail
    transporter.sendMail(mailOptions, (err, data) => {
        promptLog("Sending mail", "yellow");

        if (err) {
            console.log(err);
            reject(err);
        }
        else {
            promptLog("email sended", "green");
            resolve("email sended");
        }
    });
};

// Mail de reception d'un message par la page Me contacter
export const contactMessageReceivedMail = contactMessageData => {
    
    // Mail infos
    const mailOptions = {
        from: senderInfos, // Infos expéditeur
        to: config.PRIVATE_MAIL, // Liste de reception
        subject: "[PRIVATE] Message de contact reçu", // Objet
        html: `
            <div>
                <p>Message reçu de: ${contactMessageData.lastName} ${contactMessageData.lastName}</p>
                <p>e-mail: ${contactMessageData.email}</p>
                <p>Message :</p>
                <p style="border: 1px solid black; border-radius: 0.25em;min-height: 3em;padding: 0.5em;background-color: #EEEEEE">${contactMessageData.message}</p>
                <br/>
                <div><i>Thierry Agnelli</i></div>
                <div><i>Développeur Fullstack Javascript/React/React Native/Node...etc </i></div>
            </div>`
    };
        
    // Envoi du mail
    transporter.sendMail(mailOptions, (err, data) => {
        promptLog("Sending mail", "yellow");

        if (err) {
            console.log(err);
            reject(err);
        }
        else {
            promptLog("email sended", "green");
            resolve("email sended");
        }
    });
};
