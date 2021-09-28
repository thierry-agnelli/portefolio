// Dépendances
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// Style
import "./style.css";
// Config
import config from "../../../config.json"

// Composant d'inscription
const Registration = () => {
    /* Variable d'états */
    const [registrationData, setRegistrationData] = useState({
        email: "",
        lastName: "",
        firstName: "",
        company: "",
        address: "",
        postCode: "",
        city: "",
        phone: "",
        pwd: ""
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    /* Références */
    const emailRef = useRef(null);
    const lastNameRef = useRef(null);
    const cityRef = useRef(null);
    const pwdRef = useRef(null);
    const repeatPwdRef = useRef(null);

    /* Fonctions */
    const checkRepeatPwd = () => {
        // Vérification si le mot de passe répété est identique au mot de passe
        if (repeatPwdRef.current.value !== registrationData.pwd)
            repeatPwdRef.current.classList.add("formInputError");
        else
            repeatPwdRef.current.classList.remove("formInputError");
    };

    const submitRegistration = () => {
        // Vérification si les champs requis ont été remplis
        let dataChecked = true;

        for (let field in registrationData) {

            switch (field) {
                case "email":
                    // Expression régulière pour vérification email au format *@*.* (* = n fois n'importe quel caractère)
                    const regex = new RegExp(".+@.+[.].+");
                    if (!regex.exec(registrationData[field])) {
                        emailRef.current.classList.add("formInputError");
                        dataChecked = dataChecked && false;
                    }
                    break;
                case "lastName":
                    if (registrationData[field] === "") {
                        lastNameRef.current.classList.add("formInputError");
                        dataChecked = dataChecked && false;
                    }
                    break;
                case "pwd":
                    if (registrationData[field] === "") {
                        pwdRef.current.classList.add("formInputError");
                        repeatPwdRef.current.classList.add("formInputError");
                        dataChecked = dataChecked && false;
                    }
                    break;
                default:
                    break;
            }
        }

        if (repeatPwdRef.current.value !== registrationData.pwd)
            dataChecked = dataChecked && false;

        if (dataChecked) {

            fetch(`${config.API_URL}/user/registration`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(registrationData)
            })
                .then(res => {
                    if (res.ok)
                        return res.text();
                    else
                        throw res;
                })
                .then(response => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch(error => {
                    error.text()
                        .then(message => setError(message));
                });
        }

    };

    /* Handles */
    const dataInput = (e) => {
        const field = e.target.id.split('_')[1];

        // Suprression de l'affichage d'erreur = la saisie 
        e.target.classList.remove("formInputError");

        // Si le champs n'est pas le password répété (champ de données)
        if (field !== "repeatPwd") {
            registrationData[field] = e.target.value;
            setRegistrationData({ ...registrationData });
            // Vérification que le password correspond au password répété
            if (field === "pwd")
                checkRepeatPwd();

            // Pré-remplissage ville selon code postal
            if (field === "postCode" && e.target.value.length === 5) {
                fetch(`https://geo.api.gouv.fr/communes?codePostal=${e.target.value}`)
                    .then(res => res.json())
                    .then(json => {
                        cityRef.current.value = json[0].nom;
                    })
                    .catch((err) => {
                        console.log(err);
                        cityRef.current.value = "";
                    })
                    .finally(() => {
                        registrationData.city = cityRef.current.value;
                        setRegistrationData({ ...registrationData });
                    });

            }
        }
        // Sinon vérification que le password répété est identique au password
        else
            checkRepeatPwd();
    };

    return (
        <div id="registerContainer">
            {!success ?
                <>
                    <h2>Inscription</h2>
                    <form className="formContainer">
                        <label className="LabelRow" htmlFor="registerInput_email">E-mail : <span className="requiredField">*</span></label>
                        <input type="email" id="registerInput_email" ref={emailRef} onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_lastName">Nom : <span className="requiredField">*</span></label>
                        <input type="text" id="registerInput_lastName" ref={lastNameRef} onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_firstName">Prénom :</label>
                        <input type="text" id="registerInput_firstName" onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_company">Société :</label>
                        <input type="text" id="registerInput_company" onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_adress">Address :</label>
                        <input type="text" id="registerInput_address" onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_postCode">Code Postal :</label>
                        <input type="text" id="registerInput_postCode" onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_city">Ville :</label>
                        <input type="text" id="registerInput_city" ref={cityRef} onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_phone">Numéro de téléphone :</label>
                        <input type="text" id="registerInput_phone" onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_pwd">Mot de passe : <span className="requiredField">*</span></label>
                        <input type="password" id="registerInput_pwd" ref={pwdRef} onChange={dataInput} />
                        <label className="LabelRow" htmlFor="registerInput_repeatPwd">Répéter le mot de passe : <span className="requiredField">*</span></label>
                        <input type="password" id="registerInput_repeatPwd" ref={repeatPwdRef} onChange={dataInput} />
                    </form>
                    <div>
                        <button className="formButton" onClick={submitRegistration}>Soumettre</button>
                    </div>
                    <div className="error">{error}</div>
                </> :
                <>
                    <h2>Bravo !</h2>
                    <p>Un e-mail de confirmation vous a été envoyé. Veuillez consulter votre boîte de réception.</p>
                </>}
                <Link to="/acceuil" className="link" >Retour à l'accueil</Link>
        </div>
    );
};

export default Registration;
