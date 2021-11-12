// Dépendances
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// Config
import config from "./../../../config.json"
// Style
import "./style.css";

// Page d'envoi d'e-mail pour reset el password
const ForgottenPwd = () => {
    // Variables d'états
    const [email, setEmail] = useState("");
    const [requestSended, setRequestSended] = useState(false);
    // Références
    const resetPwdMail = useRef(null);
    /* Handles */
    // Mail input
    const mailInput = e => setEmail(e.target.value);
    // Bouton de réinitialisation du mot de passe
    const resetPwdBtnClick = e => {
        // Expression régulière pour vérification email au format *@*.* (* = n fois n'importe quel caractère)
        const regex = new RegExp(".+@.+[.].+");
        
        // Vérification l'email a été correctement renseigné
        if (!regex.exec(email))
            resetPwdMail.current.classList.add("formInputError");
        else{
            resetPwdMail.current.classList.remove("formInputError");
            fetch(`${config.API_URL}/user/reset-password`,{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email: email})
            });
            setRequestSended(true);
        }
    }

    return (
        <div id="forgottenPwdContainer">
            <h3>Mot de passe oublié</h3>
            {!requestSended ?
            <>
            <form className="formContainer">
                <h3>Envoi d'un mai de réinitialisation du mot de passe</h3>
                <label htmlFor="recoveryPwdMail">E-mail : <span className="requiredField">*</span></label>
                <input id="recoveryPwdMail" ref={resetPwdMail} type="email" onChange={mailInput}/>
            </form>
            <button id="resetPwdBtn" className="formButton" onClick={resetPwdBtnClick}>Réinitialiser le mot de passe</button>
            </>:
            <div>Un e-mail de réinitialisation de mot de passe à été envoyé à l'adresse suivante : {email}</div>}
            <Link to="/accueil" className="link">Retour à l'accueil</Link>
        </div>
    );
};

export default ForgottenPwd;