// Dépendances
import { useState, useEffect } from "react";
// Config
import config from "../../../config.json";
// Style
import "./style.css";


// Composants expériences professionelles
const Experiences = () => {
    // Varaibles d'état
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        fetch(`${config.API_URL}/experience/get-all`)
            .then(response => {
                if (response.status === 200)
                    return response.json();
                else
                    throw response;
            })
            .then(json => setExperiences(json))
            .catch(err => err.text().then(message => console.log(message)));
    }, []);

    return (
        <section>
            <h3 className="pageTitle">EXPERIENCES PROFESSIONELLES</h3>
            {experiences.map( item => 
                <div key={item.order} className="contentArticle">
                    <div className="contentTitle">{item.endDate ? "Depuis " : null}{item.startDate}{item.endDate ? ` à ${item.endDate}` : null}</div>
                    <div className="expSociety">{item.society}</div>
                    <div>{item.job}</div>
                    <ul className="jobDesc">
                        {item.responsability.map((element, index) => <li key={index}>{element}</li>)}
                    </ul>
                </div>)}
        </section>
    );
};

export default Experiences;