// Dépendances
import { useState, useRef, useEffect } from "react";
// config
import config from "../../../config.json";
// Style
import "./style.css"
// Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileCode } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Composant Acceuil
const Home = () => {
    /* Variables d'états */
    const [qualifications, setQualifications] = useState([]);
    const [skills, setSkills] = useState([]);
    const [actRotation, setActRotation] = useState(0);
    /* Références */
    const infoToolTipRef = useRef(null);
    const infoCarrousselRef = useRef(null);

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
                        skillsList[element.order].list.push({ _id: element._id, name: element.name, info: element.info });
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
            infoToolTipRef.current.innerHTML = `
                    <div id="infoToolTipTitle">${toolTipTitle}</div>
                    ${toolTipItalic ? `<div><i>${toolTipItalic}</i></div>` : "</>"}
                    ${toolTipInfo1 ? `<div>${toolTipInfo1}</div>` : "</>"}
                    ${toolTipInfo2 ? `<div>${toolTipInfo2}</div>` : "</>"}
                    `;

            // Modification position
            // infoToolTipRef.current.style.top = `${e.target.offsetTop}px`;
            infoToolTipRef.current.style.top = `${e.target.offsetTop + 250}px`;
            infoToolTipRef.current.style.left = `${e.target.offsetLeft + 150}px`;
            // Affichage
            infoToolTipRef.current.style.visibility = "visible";
        }
    };

    // Masquage Tool Tip
    const infoToolTipHide = (e) => {
        // Masquage
        infoToolTipRef.current.style.visibility = "hidden";

        //Suppression contenu tool tip
        infoToolTipRef.current.innerHTML = null;
    };

    // Rotation infos
    const infosContainerRotation = (e) => {
        console.log(e.target.classList[0]);
        let rotation;
        if (e.target.id.split('-')[1] === "Right")
            rotation = 120;
        else
            rotation = -120;

        infoCarrousselRef.current.style.transform = `rotateY(${actRotation + rotation}deg) translateZ(-400px)`;

        setActRotation(actRotation + rotation);
    };

    return (
        <section id="homeContainer">
            <div id="infoRotationCommands">
                <FontAwesomeIcon id="infoCommand-Left" className="infoCommand" icon={faChevronLeft} size="1x"  onClick={infosContainerRotation}/>
                <FontAwesomeIcon id="infoCommand-Right" className="infoCommand" icon={faChevronRight} size="1x"  onClick={infosContainerRotation}/>
            </div>
            <div id="infoMainContainer">
                <div id="infoCarroussel" className="carrousselZScale" ref={infoCarrousselRef} style={{transform: `rotateY(${actRotation}deg) translateZ(-400px)`}}>
                    <div id="qualifInfo" className="infoContainer">
                        <div className="infotitle">
                            <div className="infoIcontainer">
                                <FontAwesomeIcon icon={faGraduationCap} id="qualifIcon" size="1x" />
                            </div>
                            <h3>Formations</h3>
                        </div>
                        <div className="infoContent">
                            <ul className="infoItemList">
                                {qualifications.map(item =>
                                    <li key={`qualif_${item._id}`} id={`qualif_${item._id}`} className="itemElement" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{item.title}{item.year ? <FontAwesomeIcon icon={faQuestionCircle} className="infoToolTipIcon" /> : null}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div id="skillInfo" className="infoContainer">
                        <div className="infotitle">
                            <div className="infoIcontainer">
                                <FontAwesomeIcon icon={faFileCode} id="skillIcon" size="1x" />
                            </div>
                            <h3>Compétence</h3>
                        </div>
                        <div className="infoContent">
                            {skills.map((item, index) =>
                                <div key={`${index}_${item.category}`} className="infoItem">
                                    <h4>{item.category}</h4>
                                    <ul className="infoItemList">
                                        {item.list.map(element =>
                                            <li key={`skill_${element._id}`} id={`skill_${element._id}_${item.category}`} className="itemElement" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{element.name}{element.info ? <FontAwesomeIcon icon={faQuestionCircle} className="infoToolTipIcon" /> : null}</li>
                                        )}
                                    </ul>
                                </div>)}
                        </div>
                    </div>
                    <div id="presentationInfo" className="infoContainer">
                        <div className="infotitle">
                            <div className="infoIcontainer">
                                <FontAwesomeIcon icon={faFileAlt} id="presentationIcon" size="1x" />
                            </div>
                            <h3>Présentation</h3>
                        </div>
                        <div className="infoContent">
                            <div id="presentationText">
                                <div className="presentationParagraph">Initialement diplômé d'un BTS électronique, où j'y ai découvert mes premières expériences de code (programation de microcontrôleur en C), j'ai par la suite exploré en auto-didacte différents langages (C/C++, C#, VBA, ruby, lua...).</div>
                                <div className="presentationParagraph">D'abord à titre de loisir en C# sur Unity 3D et le développement de quelques add-ons pour jeux vidéos en lua, j'ai pu ensuite utiliser ces compétences dans le cadre professionel avec du VBA pour la création de macro sur Excel et de base de données Access, et en C# pour des logiciels standalone.</div>
                                <div className="presentationParagraph">Pour concrétiser ma volonté de reconversion j'ai suivi une formation au Bocal Academy de Nice dans le domaine du développement web et mobile de développeur Fullstack.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={infoToolTipRef} id="infoToolTip" />
            {/* <div id="infoRotationCommandsContainer">
                <button id="infoCommand-Left" className="infoRotationCommands" onClick={infosContainerRotation}>{"<"}</button>
                <button id="infoCommand-Right" className="infoRotationCommands" onClick={infosContainerRotation}>{">"}</button>
            </div>
            <div id="infoMainContainer">
                <div ref={infoToolTipRef} id="infoToolTip" />
                <div id="infoContainerWrapper" ref={infoContainerWrapperRef}>
                    <div className="infoContainer qualifInfoContainer">
                        <div className="infoTitle">
                            <div>
                                <FontAwesomeIcon icon={faGraduationCap} className="qualifIcon" size="1x" />
                            </div>
                            <h3>Formations</h3>
                        </div>
                        <ul className="infoItemList">
                            {qualifications.map(item =>
                                <li key={`qualif_${item._id}`} id={`qualif_${item._id}`} className="infoItem" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{item.title}{item.year ? <FontAwesomeIcon icon={faQuestionCircle} id="infoIcon" /> : null}</li>
                            )}
                        </ul>
                    </div>
                    <div className="infoContainer skillInfoContainer">
                        <div className="infoTitle">
                            <div>
                                <FontAwesomeIcon icon={faFileCode} className="skillIcon" />
                            </div>
                            <h3>Compétences</h3>
                        </div>
                        <div className="infoContent">
                            {skills.map((item, index) =>
                                <div key={`${index}_${item.category}`} className="infoItem">
                                    <h4>{item.category}</h4>
                                    <ul className="infoItemList">
                                        {item.list.map(element =>
                                            <li key={`skill_${element._id}`} id={`skill_${element._id}_${item.category}`} className="itemElement" onMouseOver={infoToolTipShow} onMouseLeave={infoToolTipHide}>{element.name}{element.info ? <FontAwesomeIcon icon={faQuestionCircle} id="infoIcon" /> : null}</li>
                                        )}
                                    </ul>
                                </div>)}
                        </div>
                    </div>
                    <div className="infoContainer presentationInfoContainer">
                        <div className="infoTitle">
                            <div>
                                <FontAwesomeIcon icon={faFileAlt} className="infoIcon" />
                            </div>
                            <h3>Présentation</h3>
                        </div>
                        <div className="infoContent">
                            <div id="presentationText">
                                <div>Initialement diplômé d'un BTS électronique, où j'y ai découvert mes premières expériences de code (programation de microcontrôleur en C), j'ai par la suite exploré en auto-didacte différents langages (C/C++, C#, VBA, ruby, lua...).</div>
                                <div>D'abord à titre de loisir en C# sur Unity 3D et le développement de quelques add-ons pour jeux vidéos en lua, j'ai pu ensuite utiliser ces compétences dans le cadre professionel avec du VBA pour la création de macro sur Excel et de base de données Access, et en C# pour des logiciels standalone.</div>
                                <div>Pour concrétiser ma volonté de reconversion j'ai suivi une formation au Bocal Academy de Nice dans le domaine du développement web et mobile de développeur Fullstack.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}
        </section>
    );
}

export default Home;