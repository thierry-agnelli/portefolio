// Dépendances
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// Config
import config from "../../../config.json";
// Style
import "./style.css";

const Contact = () => {
    // Variables d'état
    const [messageData, setMessageData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [success, setSuccess] = useState(false);

    // Références
    const references = {
        firstName: useRef(null),
        lastName: useRef(null),
        email: useRef(null),
        message: useRef(null),
    };

    /* Handler */
    // Data Input
    const messageDataInput = (e) => {
        // Retrait de l'affichage d'erreur
        e.target.classList.remove("formInputError");
        // Récupération des données saisies dans le champs correspondant
        messageData[e.target.id.split('_')[1]] = e.target.value;
        setMessageData({ ...messageData });
    };

    // Clic bouton envoi
    const sendMessageBtnClic = (e) => {
        // Vérification des données saisies
        let dataChecked = true;
        for (const element in messageData) {
            if (messageData[element] === "") {
                references[element].current.classList.add("formInputError");
                dataChecked = false;
            }
            // Format addresse email 
            if (element === "email") {
                // Expression régulière pour vérification email au format *@*.* (* = n fois n'importe quel caractère)
                const regex = new RegExp(".+@.+[.].+");
                if (!regex.exec(messageData[element])) {
                    references[element].current.classList.add("formInputError");
                    dataChecked = false;
                }
            }
        }

        // Si les données saissies sont ok
        if (dataChecked) {

            fetch(`${config.API_URL}/message/send`, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify(messageData)
            })
            .then(response => setSuccess(true));
        }
    };

    return (
        <div id="contactContainer">
            {!success ?
                <>
                    <div className="pageTitle">
                        <h3>Me contacter</h3>
                    </div>
                    <form id="contactForm">
                        <div className="formContainer">
                            <label htmlFor="contactInput_lastName" className="labelRow">Nom :<span className="requiredField">*</span></label>
                            <input id="contactInput_lastName" ref={references.lastName} type="text" onChange={messageDataInput} />
                            <label htmlFor="contactInput_firstName" className="labelRow">Prénom :<span className="requiredField">*</span></label>
                            <input id="contactInput_firstName" ref={references.firstName} type="text" onChange={messageDataInput} />
                            <label htmlFor="contactInput_email" className="labelRow">e-mail :<span className="requiredField">*</span></label>
                            <input id="contactInput_email" ref={references.email} type="email" onChange={messageDataInput} />
                            <label htmlFor="contactInput_message" className="labelRow">Message :<span className="requiredField">*</span></label>
                        </div>
                        <textarea id="contactInput_message" ref={references.message} placeholder="Votre message..." onChange={messageDataInput} />
                    </form>
                    <button className="formButton" onClick={sendMessageBtnClic}>Envoyer</button>
                </> :
                <>
                    <div>Votre message a bien été enregistré.</div>
                </>}
                <Link to="/accueil" className="link">Retour à l'accueil</Link>
        </div>
    );
};

export default Contact;
