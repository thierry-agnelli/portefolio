// Dépendances
import React, { useState, useRef, useEffect } from "react";
// Style
import "./style.css";
// Config
import config from "../../../config.json";
// image
import imgNotFound from "../../medias/images/image-not-found.png";
// Constantes
const scale = 40;

// Page des réalisations
const Makings = () => {
    // Variables d'états
    const [makingList, setMakingList] = useState([]);
    const [posList, setPosList] = useState([]);
 

    // Calcul des positions & Récupération de la liste des réalisations
    useEffect(() => {
        fetch(`${config.API_URL}/making/get-all`)
            .then(res => res.json())
            .then(json => {

                // Positions
                let positions = new Array(json.length);
                for (let i=0; i < json.length; i++){
                    
                    let offset = i <= json.length / 2 ? 0 - scale : 0 - (json.length + 1) * scale;
                    positions[i] = (i + 1) * scale + offset;
                }
        
                // Liste des réalisations
                let list = []                
                json.map((making, index) => {
                    list.push({
                        name: making.name,
                        ref: React.createRef(),
                        position: positions[index]
                    });
                });

                // Maj state
                setPosList(positions);
                setMakingList(list);
            })
            .catch(err => console.log("nok"));
    }, []);

    /* Handler */
    // Commandes Carroussel
    const carrousselCommand = (e) => {

        // Défilement des éléments
        makingList.map((making) => {            
            // Calcul de la nouvelle position
            let newPos = e.target.id.split('-')[1] === "Right" ? making.position + scale : making.position - scale;
            
            // Si la nouvelle position est au bout à droite ( > au max) renvoie à la positon la plus à gauche
            if(newPos > posList[Math.floor(posList.length/2)]){
                newPos = posList[Math.floor(posList.length/2) + 1];
                making.ref.current.style.visibility = "hidden";
                ShowElement(making);
            }
            // Si la nouvelle position est au bout à gauche ( < au min) renvoie à la positon la plus à droite
            if(newPos < posList[Math.floor(posList.length/2) + 1]){
                newPos = posList[Math.floor(posList.length/2)];
                making.ref.current.style.visibility = "hidden";
                ShowElement(making);
            }    

            making.ref.current.style.transform = `translateX(${newPos}em) translateZ(${newPos === 0 ? "0" : "-200"}px)`;
            
            making.position = newPos;
        });
        setMakingList(makingList);
        
    }

    // Fonctions
    const ShowElement = async (element) => {
        setTimeout(() => element.ref.current.style.visibility = "visible", 350);;
    };

    return (
        <section id="makingsContainer">
            <h3 className="pageTitle">REALISATIONS (en cours de construction)</h3>
            <div id="makingsList">
                {makingList.map((item, index) =>
                    <div className="makingItem"
                        id={`making-${index}`}
                        key={`making-${index}`}
                        ref={item.ref}
                        style={{ transform: `translateX(${item.position}em) translateZ(${item.position === 0 ? "0" : "-200"}px)` }}
                        >
                        <img alt="app_image" src={imgNotFound} />
                        <div className="makingItemInfos">
                            <div className="makingItemTitle">Item {item.name}</div>
                            <div>Item présentation</div>
                            <a className="makingLink" href="">lien</a>
                        </div>
                    </div>
                )}
            </div>
            <div id="makingCarrousselCommands">
                <button id="makingCarrousselCommand-Left" className="carrousselCommand" onClick={carrousselCommand}>{"<"}</button>
                <button id="makingCarrousselCommand-Right" className="carrousselCommand" onClick={carrousselCommand}>{">"}</button>
            </div>
        </section>
    );
};

export default Makings;
