// Dépendances
import { Link } from "react-router-dom"
//Composants
import LogMenu from "./LogMenu/LogMenu.js";
// Styles
import "./style.css"


// Bannière du site
const Banner = () => {
    return (
        <header id="banner">
            <div id="bannerLeftPart">
                <div id="photo">Une zoulie photo</div>
            </div>
            <div id="bannerRightPart">
                <div id="bannerSubRightPart">
                    <LogMenu />
                </div>
                <nav id="navMenu">
                    <ul>
                        <li><Link to="/accueil" className="link">Acceuil</Link></li>
                        <li><Link to="/competences" className="link">Compétences</Link></li>
                        <li><Link to="/realisations" className="link">Réalisations</Link></li>
                        <li><Link to="/contact" className="link">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Banner;