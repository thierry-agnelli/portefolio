// Dépendances
import { Link } from "react-router-dom"
//Composants
import LogMenu from "./LogMenu/LogMenu.js";
// Styles
import "./style.css"
// Images
import myPic from "../../medias/images/pi_ta.jpg";
// Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

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
                            <li><Link to="/accueil" className="link bannerLink">Accueil</Link></li>
                            <li><Link to="/experiences" className="link bannerLink">Expériences</Link></li>
                            <li><Link to="/realisations" className="link bannerLink">Réalisations</Link></li>
                            <li><Link to="/contact" className="link bannerLink">Me contacter</Link></li>
                        </ul>
                    </nav>
                    <div id="logMenu">
                        <LogMenu />
                    </div>
                </div>
            </div>
            <div id="bannerBottom">
                <h2>Développeur Fullstack</h2>
                <div>
                    <span>Disponible</span>
                    <a  href="https://www.linkedin.com/in/thierryagnelli" target="_blank"><FontAwesomeIcon className="presentationIcon" icon={faLinkedin} /></a>
                    <a href="https://github.com/thierry-agnelli" target="_blank"><FontAwesomeIcon className="presentationIcon" icon={faGithubSquare} /></a>
                </div>
            </div>
        </header>
    );
};

export default Banner;