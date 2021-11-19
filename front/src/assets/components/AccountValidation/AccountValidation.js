// Dépendances
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Style
import config from "../../../config.json";
import "./style.css"

const AccountValidation = () => {
    /* Paramètres URL */
    const params = useParams();
    /* Variables d'états */
    const [validated, setValidated] = useState(false);
    const [noAccountFound, setNoAccountFound] = useState(false);

    // Validation en base du compte utilisateur
    useEffect(() => {
        fetch(`${config.API_URL}/user/account-validation`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ validationToken: params.validationToken })
        })
            // Si un compte a validé a été trouvé
            .then(response => {
                if (response.status === 200)
                    response.text();
                else
                    throw response
            })
            .then(message => {
                console.log(message);
                setValidated(true);
            })
            .catch(err => {
                console.log(err);
                setNoAccountFound(true);
            });
    }, []);

    return (
        <section>
            <div id="validationContainer">
                <h3 className="pageTitle">VALIDATION DE COMPTE</h3>
                {validated ?
                    <p>Votre compte a bien été validé.</p>
                    : null}
                {noAccountFound ? 
                    <p>Votre compte a déjà été validé.</p>
                    : null}
                    <Link to="/accueil" className="link">Retour à l'accueil</Link>
            </div>
        </section>
    )
};

export default AccountValidation;