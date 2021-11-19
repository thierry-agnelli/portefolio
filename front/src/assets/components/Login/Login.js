// Dépendances
import { useState, useRef, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import config from "../../../config.json";
// Context
import { AppContext } from "../../../App";
// Style
import "./style.css";

// Page de connexion
const Login = () => {
    /* Variable d'état */
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [stayLogged, setStayLogged] = useState(false);
    const [logInSucces, setLogInSucces] = useState(false);
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState(false);

    /* Références */
    const emailInputRef = useRef(null);
    const pwdInputRef = useRef(null);

    /* Contexte */
    const context = useContext(AppContext);

    /* Handler */
    // email
    const emailInput = (e) => {
        e.target.classList.remove("formInputError");
        setEmail(e.target.value);
    }
    // password
    const pwdInput = (e) => {
        e.target.classList.remove("formInputError");
        setPwd(e.target.value);
    }
    // Rester connecté
    const stayLoggedChange = (e) => {
        setStayLogged(e.target.checked);
    }
    // login
    const loginBtnClick = () => {

        let valid = true;
        
        // Reset des erreurs
        setError("");
        setValidationError(false);
        // Expression régulière pour vérification email au format *@*.* (* = n fois n'importe quel caractère)
        const regex = new RegExp(".+@.+[.].+");

        // Vérification l'email et le password ont été renseignés
        if (!regex.exec(email)) {
            valid = false;
            emailInputRef.current.classList.add("formInputError")
        }
        if (pwd === "") {
            valid = false;
            pwdInputRef.current.classList.add("formInputError")
        }

        // Si oui tentative de connexion
        if (valid) {
            fetch(`${config.API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    pwd: pwd,
                    stayLogged: stayLogged
                })
            })
                .then(response => {
                    if (response.status === 200)
                        return response.json();
                    else{
                        if(response.status === 403)
                            setValidationError(true);

                        throw response;
                        }
                })
                .then(json => {
                    console.log(json);
                    context.setUser(json);

                    // Enregistrement des données utilisateurs en session ou local storage
                    if (stayLogged)
                        // localStorage.setItem("user", JSON.stringify(json));
                        localStorage.setItem("session", JSON.stringify(json));
                    else
                        sessionStorage.setItem("session", JSON.stringify(json));

                    setLogInSucces(true);
                })
                .catch(error => {
                    error.text()
                        .then(message => {
                            console.log(message);
                            setError(message);
                        });
                })
        }
        else
            setError("email ou mot de passe incorrect");
    }

    // Renvoi d'un email de validation"
    const validationResendMail = (e) => {
        let alertMessage = "";

        fetch(`${config.API_URL}/user/validation-mail`,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.log("nok"));
        
        // alert("Un e-mail vous été renvoyé.");
    }

    return (
        <div id="loginContainer">
            <h3 className="pageTitle">CONNECTEZ-VOUS</h3>
            <form>
                <div className="formContainer">
                    <div id="loginTopRowContainer" className="labelRow">
                        <label htmlFor="loginEmailInput">E-mail : <span className="requiredField">*</span></label>
                        <Link to="/forgotten-password" className="link forgottenPwd">Mot de passe oublié</Link>
                    </div>
                    <input type="email" id="loginEmailInput" onChange={emailInput} ref={emailInputRef} />
                    <label htmlFor="loginPwdInput" className="labelRow">Mot de passe : <span className="requiredField">*</span></label>
                    <input type="password" id="loginPwdInput" onChange={pwdInput} ref={pwdInputRef} />
                </div>
                <div id="stayLoggedContainer">
                    <input type="checkbox" id="stayLogged" onClick={stayLoggedChange} />
                    <label htmlFor="stayLogged">Rester connecté</label>
                </div>
            </form>
            <button id="loginBtn" className="formButton" onClick={loginBtnClick}>Connexion</button>
            <Link to="/registration" id="registerLink" className="link">Pas encore inscrit ?</Link>
            <div className="error">{error ?
                <> 
                    <div>{error}</div>
                    {validationError ? <div>Renvoyer un e-mail de validation <span className="errorLink" onClick={validationResendMail}>ici</span></div> : null}
                </>
            : null}</div>
            <Link to="/accueil" className="link" >Retour à l'accueil</Link>
            {/* Redirection vers accueil si réussite de connexion ou si déjà connecté */ }
    { logInSucces || context.getUser() ? <Redirect to="/accueil" /> : null }
        </div >
    );
};

export default Login;