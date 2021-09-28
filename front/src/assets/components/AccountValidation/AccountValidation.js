// Dépendances
import { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
// Style
import config from "../../../config.json";
import "./style.css"

const AccountValidation = () => {
    /* Paramètres URL */
    const params = useParams();
    /* Variables d'états */
    const [validated, setValidated] = useState(true);
    const [redirect, setRedirect] = useState(false);

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
            // Sinon (redirection vers la page d'acceuil)
            .catch(err => {
                console.log(err);
                setRedirect(true);
            });
    }, []);

    return (
        <>
            <div id="validationContainer">
                {validated ?
                    <>
                        <h2>Validation de compte</h2>
                        <p>Votre compte a bien été validé.</p>
                    </>
                    : null}
                    <Link to="/" className="link">Retour à l'acceuil</Link>
            </div>
            {redirect ? <Redirect to="/"/> : null}
        </>
    )
};

export default AccountValidation;