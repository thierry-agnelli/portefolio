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
    const [posList, setPosList] = useState([]);
    const [makingList, setMakingList] = useState([]);
    // const [images, setImages] = useState([]);
    const [images, setImages] = useState({});

    // Calcul des positions d'affichage & Récupération de la liste des réalisations
    useEffect(() => {
        fetch(`${config.API_URL}/making/get-all`)
            .then(res => res.json())
            .then(json => {

                // Calcules des déifférentes positions des éléments
                let positions = new Array(json.length);
                for (let i = 0; i < json.length; i++) {
                    let offset = i <= json.length / 2 ? 0 - scale : 0 - (json.length + 1) * scale;
                    positions[i] = (i + 1) * scale + offset;
                }


                // Liste des réalisations
                let list = []
                // let imageList = [];
                let imageList = {};
                json.map((making, index) => {
                    // Ajout de chaque réalisation à la liste
                    list.push({
                        title: making.title,
                        link: making.link,
                        details: making.details,
                        position: index,
                        ref: React.createRef()
                    });

                    // Récupération de l'image
                    let picture;
                    fetch(`${config.API_URL}/image/get-byname/${making.pictureName}`)
                        .then(picRes => {

                            if (picRes.status === 200)
                                return picRes.blob();
                            else
                                throw picRes;
                        })
                        .then(blob => picture = URL.createObjectURL(blob))
                        .catch(err => picture = imgNotFound)
                        .finally(() => {
                            // imageList.push(picture);
                            // setImages([...imageList]);
                            imageList[making.title] = picture;
                            setImages({ ...imageList });
                        })
                });
                // Maj state
                // setImages(imageList);
                setPosList(positions);
                setMakingList(list);

            })
            .catch(err => console.log("nok"));
    }, []);

    /* Handler */
    // Commandes Carroussel
    const carrousselCommand = (e) => {
        const minPos = posList.indexOf(Math.min.apply(null, posList));
        const maxPos = posList.indexOf(Math.max.apply(null, posList));

        console.log(posList);
        // Défilement des éléments
        makingList.map((making) => {
            const direction = e.target.id.split('-')[1];
           
            // Calcul de la nouvelle position
            let newPos = direction === "Right" ? making.position + 1 : making.position - 1;
            switch (true) {
                case (newPos < 0):
                    newPos = posList.length - 1;
                    break;
                case (newPos === posList.length):
                    newPos = 0;
                    break;
                case ((making.position === minPos && direction === "Left") || (making.position === maxPos && direction === "Right")):
                    making.ref.current.style.visibility = "hidden";
                    ShowElement(making);
                    break;
            }

            // Modification des positions
            making.ref.current.style.transform = `translateX(${posList[newPos]}em) translateZ(${newPos === 0 ? "0" : "-200"}px)`;
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
            <h3 className="pageTitle">REALISATIONS</h3>
            <div id="makingsList">
                {makingList.map((item, index) => {
                    return (
                        <div className="makingItem"
                            id={`making-${index}`}
                            key={`making-${index}`}
                            ref={item.ref}
                            style={{ transform: `translateX(${posList[item.position]}em) translateZ(${item.position === 0 ? "0" : "-200"}px)` }}
                        >
                            <img alt="app_image" src={images[item.title]} />
                            <div className="makingItemInfos">
                                <div className="makingItemTitle">{item.title}</div>
                                {item.details.split('\n').map((message, messIndex) => <div key={messIndex}>{message}</div>)}
                                <a className="makingLink" target="_blank" href={item.link}>{"Voir >"}</a>
                            </div>
                        </div>
                    );
                }
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
