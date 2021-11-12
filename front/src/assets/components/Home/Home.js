// Dépendances
import { useState, useRef, useEffect } from "react";
// config
import config from "../../../config.json";
// Style
import "./style.css"
// Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

// Composant Acceuil
const Home = () => {
    /* Variables d'états */
    const [qualifications, setQualifications] = useState([]);
    const [skills, setSkills] = useState([]);

    /* Références */
    const refInfoToolTip = useRef(null);


    /* Récupération infos formations et compétences */
    useEffect(() => {

        fetch(`${config.API_URL}/info/get-all`)
            .then(response => response.json())
            .then(json => {
                // Récupération des données des formations
                setQualifications(json.qualifications);

                // Récupération et mise en formes des données compétences
                const skillsList = {}
                
                for (const element of json.skills) {
                    // Si la catégorie de l'élément n'est pas encore enregistré
                    if (!skillsList[element.order]) {

                        skillsList[element.order] = {
                            category: element.category,
                            list: [{ _id: element._id, name: element.name, info: element.info }]
                        }
                    }
                    else
                        skillsList[element.order].list.push({ _id: element._id, name: element.name, info: element.info  });
                };

                // Mise des infos sous forme de tableau
                const skillsTab = [];
                for (const element in skillsList)
                    skillsTab.push(skillsList[element]);

                setSkills(skillsTab)
            });
    }, []);

    /* Handler */
    // Affichage Tool Tip
    const infoToolTipShow = (e) => {

        const [itemType, itemID, skillCategory] = e.target.id.split('_');
        let toolTipTitle, toolTipItalic, toolTipInfo1, toolTipInfo2 = null;

        if (itemType === "qualif") {
            // Récupértation de l'élément ciblé
            const qualifItem = qualifications.find(element => element._id === itemID);
            toolTipTitle = qualifItem.title;
            toolTipItalic = qualifItem.year;
            toolTipInfo1 = qualifItem.institution;
            toolTipInfo2 = qualifItem.city;
        }
        else if (itemType === "skill") {
            // Récupértation de l'élément ciblé
            const skillItem = skills.find(element => element.category === skillCategory).list.find(element => element._id === itemID);
            toolTipTitle = skillItem.name;
            toolTipInfo1 = skillItem.info;
        }

        // Insertion infos ToolTip
        if (toolTipInfo1 || toolTipItalic) {
            refInfoToolTip.current.innerHTML = `
                    <div id="infoToolTipTitle">${toolTipTitle}</div>
                    ${toolTipItalic ? `<div><i>${toolTipItalic}</i></div>` : "</>"}
                    ${toolTipInfo1 ? `<div>${toolTipInfo1}</div>` : "</>"}
                    ${toolTipInfo2 ? `<div>${toolTipInfo2}</div>` : "</>"}
                    `;

            // Modification position
            refInfoToolTip.current.style.top = `${e.target.offsetTop}px`;
            refInfoToolTip.current.style.left = `${e.target.offsetLeft + 150}px`;
            // Affichage
            refInfoToolTip.current.style.visibility = "visible";
        }
    }

    // Masquage Tool Tip
    const infoToolTipHide = (e) => {
        // Masquage
        refInfoToolTip.current.style.visibility = "hidden";

        //Suppression contenu tool tip
        refInfoToolTip.current.innerHTML = null;
    }


    return (
        <div id="homeContainer">
            <div ref={refInfoToolTip} id="infoToolTip"></div>
            <div className="infoContainer">
                <h3>Formations</h3>
                <ul className="infoItemList">
                    {qualifications.map(item =>
                        <li key={`qualif_${item._id}`} id={`qualif_${item._id}`} className="infoContent" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{item.title}{item.year ? <FontAwesomeIcon icon={faQuestionCircle} id="infoIcon"/>: null}</li>
                    )}
                </ul>
            </div>
            <div className="infoContainer">
                <h3>Compétences</h3>
                {skills.map((item, index) =>
                    <div key={`${index}_${item.category}`} className="infoContent">
                        <h4>{item.category}</h4>
                        <ul className="infoItemList">
                            {item.list.map(element =>
                                <li key={`skill_${element._id}`} id={`skill_${element._id}_${item.category}`} className="itemElement" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{element.name}{element.info ? <FontAwesomeIcon icon={faQuestionCircle} id="infoIcon"/>: null}</li>
                            )}
                        </ul>
                    </div>)}
            </div>
            <div className="infoContainer">
                <h3>Présentation</h3>
                <div id="presentationText">
                    <div>Initialement diplômé d'un BTS électronique, où j'y ai découvert mes premières expériences de code (programation de microcontrôleur en C), j'ai par la suite exploré en auto-didacte différents langages (C/C++, C#, VBA, ruby, lua...).</div>
                    <div>D'abord à titre de loisir en C# sur Unity 3D et le développement de quelques add-ons pour jeux vidéos en lua, j'ai pu ensuite utiliser ces compétences dans le cadre professionel avec du VBA pour la création de macro sur Excel et de base de données Access, et en C# pour des logiciels standalone.</div>
                    <div>Pour concrétiser ma volonté de reconversion j'ai suivi une formation au Bocal Academy de Nice dans le domaine du développement web et mobile de développeur Fullstack.</div>
                </div>
            </div>
        </div>
    );
}

export default Home;