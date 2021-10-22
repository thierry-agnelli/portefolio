// Dépendances
import { Link } from "react-router-dom"
//Composants
import LogMenu from "./LogMenu/LogMenu.js";
// Styles
import "./style.css"
// Images
import myPic from "../../medias/images/pi_ta.jpg";

// Bannière du site
const Banner = () => {
    return (
        <header id="banner">
            <div id="bannerLeftPart">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"><img alt="photo-présentation" src={myPic} /></a>
            </div>
            <div id="bannerRightPart">
                <div id="bannerSubRightPart">
                    <div id="presentationTitle">
                        <h1>Thierry Agnelli</h1>
                        <h2>Développeur Fullstack</h2>
                    </div>
                    <div id="logMenu">
                        <LogMenu />
                    </div>
                </div>
                <nav id="navMenu">
                    <ul>
                        <li><Link to="/accueil" className="link">Accueil</Link></li>
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