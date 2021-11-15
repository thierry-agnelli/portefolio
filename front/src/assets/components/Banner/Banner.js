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
            <div id="bannerTop">
                <div>
                    <div id="presentationPhoto">
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                            <img alt="thierry_agnelli" src={myPic} />
                        </a>
                    </div>
                    <h1>Thierry Agnelli</h1>
                </div>
                <div id="bannerTopRight">
                    <nav id="navMenu">
                        <ul>
                            <li><Link to="/accueil" className="navLink">Accueil</Link></li>
                            <li><Link to="/experiences" className="navLink">Expériences</Link></li>
                            <li><Link to="/realisations" className="navLink">Réalisations</Link></li>
                            <li><Link to="/contact" className="navLink">Me contacter</Link></li>
                        </ul>
                    </nav>
                    <div id="logMenu">
                        <LogMenu />
                    </div>
                </div>
            </div>
            <div id="bannerBottom">
                <h2>Développeur Fullstack</h2>
                <div>Disponible</div>
            </div>
        </header>
    );
};

export default Banner;