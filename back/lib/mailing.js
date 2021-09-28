// Dépendances
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// Lib
import { promptLog } from "../lib/logs.js";
// Config
import config from "../config.js";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: config.EMAIL, // generated ethereal user
        pass: config.PASS, // generated ethereal password
    },
});

export const accountValidationMail = (accountInfos) => {

    return new Promise((resolve, reject) => {
        promptLog("Account verification mailing", "yellow");

        // send mail with defined transport object
        const mailOptions = {
            from: "Thierry AGNELLI", // sender address
            to: accountInfos.email, // list of receivers
            subject: "Bienvenue", // Subject line
            html: `
                <div>
                    <p>Bonjour M/Mme ${accountInfos.lastName}</p>
                    <br/>
                    <p>Vous venez de vous inscrire sur mon site, bienvenue à vous.</p>
                    <p>Merci de cliquer sur ce lien pour valider votre compte :</p>
                    <p>${config.FRONT_URL}/account-validation/${accountInfos.validated}</p>
                    <br/>
                    <div><i>Thierry Agnelli</i></div>
                    <div><i>Développeur Fullstack Javascript/React/React Native/Node...etc </i></div>
                </div>`
        };

        transporter.sendMail(mailOptions, (err, data) => {
            promptLog("Sending mail", "yellow");
            if (err)
                reject(err);

            resolve("email sended");
        });
    });
};

export const resetPasswordMail = (accountInfos) => {
    
    const token = jwt.sign({ id: accountInfos._id }, config.KEY, { expiresIn: 1800 });

    // send mail with defined transport object
    const mailOptions = {
        from: "Thierry AGNELLI", // sender address
        to: accountInfos.email, // list of receivers
        subject: "Demande de réinitialisation de mot de passe", // Subject line
        html: `
            <div>
                <p>Bonjour M/Mme ${accountInfos.lastName}</p>
                <br/>
                <p>Vous venez de vous faire une demande de réinitialisation de mot de passe.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, faites attention à vérifier vos mots de passes.</p>
                <br/>
                <p>Pour réinitialiser le mot de passe veuillez suivre ce lien (lien valide pendant 30mn):</p>
                <p>${config.FRONT_URL}/reset-password/${token}</p>
                <br/>
                <div><i>Thierry Agnelli</i></div>
                <div><i>Développeur Fullstack Javascript/React/React Native/Node...etc </i></div>
            </div>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        promptLog("Sending mail", "yellow");
        if (err)
            reject(err);

        resolve("email sended");
    });

};