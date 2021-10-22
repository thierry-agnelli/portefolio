// Dépendances
import { useState, useEffect } from "react";
// Config
import config from "../../../config.json";
// Style
import "./style.css";

const Skills = () => {
    // Varaibles d'états
    const [categories, setCategories] = useState([]);

    // Récupération catégories
    useEffect(() => {
        fetch(`${config.API_URL}/skill/getSkillInfos`)
            .then(response => response.json())
            .then(json => {
                const categoriesList = {}
                // Mise en formes des données contenant toutes les compétences pour chaque catégorie
                for (const element of json) {
                    // Si la catégorie de l'élément n'est pas encore enregistré
                    if (!categoriesList[element.Order]) {

                        categoriesList[element.Order] = {
                            category: element.Category,
                            list: [element.Name]
                        }
                    }
                    else
                        categoriesList[element.Order].list.push(element.Name);
                };

                // Mise des infos sous forme de tableau
                const categoryTab = [];

                for (const element in categoriesList)
                    categoryTab.push(categoriesList[element]);

                setCategories(categoryTab)
            });
    }, []);

    console.log(categories);


    return (
        <div>
            <div className="pageTitle">
                <h3>Compétences</h3>
            </div>
            <div id="skillContainer">
                {categories.map((item, index) =>
                    <div key={`${index}_${item.category}`}>
                        <div className="contentTitle">
                            <h4>{item.category}</h4>
                        </div>
                        <div>
                            <ul className="skillList">
                                {item.list.map((element, index) =>
                                    <li key={`${index}_element`} className="skillElement">{element}</li>
                                )}
                            </ul>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Skills;
