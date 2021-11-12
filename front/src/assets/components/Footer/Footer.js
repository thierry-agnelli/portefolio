// Style
import "./style.css";
// Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {

    return (
        <footer id="footer">
            <div id="footerlinkTitle">Liens</div>
            <div id="footerLinkContainer">
                <a href="https://www.linkedin.com/in/thierryagnelli" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin}/> Linkedin
                </a>
                <a href="https://github.com/thierry-agnelli" target="_blank">
                    <FontAwesomeIcon icon={faGithubSquare}/> Github
                </a>
            </div>
            <div id="footerBottomLine">2021 - Thierry AGNELLI - thierry.agnelli@gmail.com</div>
        </footer>
    );
};

export default Footer;