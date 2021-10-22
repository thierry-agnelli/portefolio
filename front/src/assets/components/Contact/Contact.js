// Style
import "./style.css";

const Contact = () => {

    return(
        <div id="contactContainer">
            <div className="pageTitle">
                <h3>Contact</h3>
            </div>
            <form id="contactForm">
                <label>e-mail</label>
                <input type="email"/>

            </form>
        </div>
    );
};

export default Contact;
