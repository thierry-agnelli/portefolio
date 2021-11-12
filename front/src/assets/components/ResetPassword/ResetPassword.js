// Dépendances
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// Config
import config from "../../../config.json"
// Style
import "./style.css";

// Page de réinitialisatond du mot de passe
const ResetPassword = () => {
    /* Paramètres URL */
    const params = useParams();
    /* Variables d'états */
    const [validToken, setValidToken] = useState(false);
    const [newPwd, setNewPwd] = useState("");
    const [repeatedNewPwd, setRepeatedNewPwd] = useState("");
    const [pwdUpdated, setPwdUpdated] = useState(false);
    /* Références */
    const newPwdRef = useRef(null);
    const repeatedNewPwdRef = useRef(null);

    /* Fonctions */
    const checkRepeatedNewPwd = () => {
        // Vérification si le mot de passe répété est identique au mot de passe
        if (repeatedNewPwd !== newPwd)
            repeatedNewPwdRef.current.classList.add("formInputError");
        else {
            newPwdRef.current.classList.remove("formInputError");
            repeatedNewPwdRef.current.classList.remove("formInputError");
        }
    };

    // Vérification de la validité du lien
    useEffect(() => {
        fetch(`${config.API_URL}/user/token-validation/${params.token}`)
            .then(response => {
                if (response.status === 200)
                    // Si le lien est valid affichage du formulaire de reset du password
                    setValidToken(true);
                else
                    throw response;
            })
            .catch(err => {
                err.text()
                    .then(message => console.log(message));
            })
    }, []);

    // Vérification si le mot de passe répété est identique au mot de passe
    useEffect(() => {
        // Vérification de la validité du token (erreur si nok car inputs non affichés)
        if (validToken)
            checkRepeatedNewPwd();
    }, [newPwd, repeatedNewPwd]);

    /* Handles */

    // Nouveau mot de passe
    const newPwdInput = e => {
        newPwdRef.current.classList.remove("formInputError");
        setNewPwd(e.target.value)
    };
    const repeatedNewPwdInput = e => {
        repeatedNewPwdRef.current.classList.remove("formInputError");
        setRepeatedNewPwd(e.target.value)
    };

    // Réinitialisation du mot de passe
    const resetPwdBtnClick = (e) => {
        // Vérification si les inputs ne sont pas vides
        if (newPwd === "")
            newPwdRef.current.classList.add("formInputError");
        if (repeatedNewPwd === "")
            repeatedNewPwdRef.current.classList.add("formInputError");

        // SI ok
        if (newPwd === repeatedNewPwd) {
            // Envoie du nouveau mot de passe
            fetch(`${config.API_URL}/user/change-password`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    token: params.token,
                    newPwd: newPwd
                })
            })
                .then(response => {
                    if (response.status === 200)
                        setPwdUpdated(true);
                    else
                        console.log("error");

                });
        }
    };

    return (
        <div>
            <div id="resetPwdContainer">
                {validToken ?
                    <>
                        {!pwdUpdated ? <>
                            <h3>REINITIALISATIONDU MOT DE PASSE</h3>
                            <form>
                                <div className="formContainer">
                                    <label htmlFor="newPwdInput" className="labelRow">Nouveau mot de passe : <span className="requiredField">*</span></label>
                                    <input type="password" id="newPwdInput" onChange={newPwdInput} ref={newPwdRef} />
                                    <label htmlFor="repeatNewPwdInput" className="labelRow">Répéter mot de passe : <span className="requiredField">*</span></label>
                                    <input type="password" id="repeatNewPwdInput" ref={repeatedNewPwdRef} onChange={repeatedNewPwdInput} />
                                </div>
                            </form>
                            <button id="resetPwdBtn" className="formButton" onClick={resetPwdBtnClick}>Réinitialisation</button>
                        </> :
                            <>
                                <div>Le mot de passe a bien été mis à jour</div>
                                <Link to="/login" className="link">Connexion</Link>
                                <Link to="/accueil" className="link">Retour à l'accueil</Link>
                            </>}
                    </> :
                    <>
                        <div>Le lien n'est plus valide.</div>
                    </>}
            </div>
        </div>
    );
};

export default ResetPassword;