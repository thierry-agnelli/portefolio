// Dépendances
import { Link, useHistory } from "react-router-dom";
// Images
import wipLogo from "../../medias/images/work-in-progress-icon.jpg"
// Style
import "./style.css"

// Composants work in progress
const Wip = () => {
    /* Historique */
    const history = useHistory();

    /* Handles */
    const backPage = () =>{
        history.goBack();
    }

    return (
        <div id="wipContainer">
            <div id="wipMessage">
                <img src={wipLogo} alt="Work in progress"/>
                <h2>WORK IN PROGRESS</h2>
            </div>
            <div onClick={backPage} className="link">Retour à la page précédente</div>
            <Link to="/accueil" className="link">Retour à l'accueil</Link>
        </div>
    )
};

export default Wip;