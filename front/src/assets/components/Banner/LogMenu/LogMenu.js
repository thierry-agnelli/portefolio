// Dépendances
import { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import { AppContext } from "../../../../App";
// Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// Style
import "./style.css";

// Composants de gestion de la connexion
const LogMenu = () => {
    // Context
    const context = useContext(AppContext);
    /* Handles */
    const unlog = () => {
        context.setUser(null);

        sessionStorage.removeItem("session");
        localStorage.removeItem("session");
    }

    return (
        <div id="LogContainer">
            <FontAwesomeIcon icon={faUser} id="userIcon" size="1x"/>
            <div id="logTextContainer">
                {context.getUser() ?
                <div id="currentUserContainer">
                    <div>{`${context.getUser().lastName} ${context.getUser().firstName}`}</div>
                    <div id="unlog" className="link" onClick={unlog}>Déconnexion</div>
                </div> :
                <Link to="/login" className="link">Se connecter</Link>}
            </div>
        </div>
    )
}

export default LogMenu;