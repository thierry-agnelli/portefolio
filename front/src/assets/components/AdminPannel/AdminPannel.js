// Dépendances
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Buffer } from "buffer";

// Contexte
import { AppContext } from "../../../App";
// Config
import config from "../../../config.json";
// Style
import "./style.css";


// Panneau admin
const AdminPannel = () => {
    // Variables d'états
    const [isAdmin, setIsAdmin] = useState(true);
    const [picture, setPicture] = useState(null);
    const [makingBinaryPic, setMakingBinaryPic] = useState(null);
    const [makingData, setmakingData] = useState({
        title: "",
        link: "",
        info: ""
    });

    // Contexte
    const context = useContext(AppContext);

    /* Hook */
    useEffect(() => {
        const user = context.getUser();

        if (user) {
            // Vérification qu'un utilisateur est log
            if (user.authToken) {
                // Interrogation de la base pour savoir si c'est un admin
                fetch(`${config.API_URL}/user/is-admin/${user.authToken}`)
                    .then(response => {
                        if (response.status !== 200)
                            throw response;
                    })
                    // L'utilisateur n'est pas trouvé ou n'est pas un administrateur
                    .catch(error => {
                        error.text()
                            .then(message => console.log(message));

                        setIsAdmin(false);
                    });
            }
            else
                setIsAdmin(false);

        }
    }, [context.getUser()]);

    useEffect(() => {
        // Affichage aperçu de l'image
        if (picture) // Sécurité au premier chargement de la page picture = null
            fileToBinary(picture)
                .then(binary => {
                    fetch(binary)
                        .then(result => result.blob())
                        .then(blob => {
                            setMakingBinaryPic(blob)
                        })
                        .catch(err => err);
                })
                .catch(err => console.log(err));
    }, [picture]);

    /* Handler */
    // Chargement d'une image
    const imageloading = (e) => {
        setPicture(e.target.files[0]);
    }

    const dataInput = (e) => {
        makingData[e.target.id.split('-')[1]] = e.target.value;
        setmakingData({ ...makingData });
    }

    // Envoie de l'image
    const sendMaking = (e) => {
        // Conversion Fichier image en binaire
        fileToBinary(picture)
            .then(binary => {
                // envoie de l'élément au serveur
                fetch(`${config.API_URL}/making/store`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: makingData.title,
                        link: makingData.link,
                        info: makingData.info,
                        pictureName:picture.name
                    })
                })
                    .then(response => {
                        if(response.status === 200){
                            console.log(binary);
                            // Si l'enregistrement de la réalisation s'est bien passée enregistrement de l'image
                            fetch(`${config.API_URL}/image/store`,{
                                method: "POST",
                                headers:{
                                    "Accept": "application/json",
                                    "Content-type": "application/json"
                                },
                                body:JSON.stringify({
                                    // name: picture.name,
                                    binary: binary.split(',')[1],
                                    // contentType: makingBinaryPic.type
                                })
                            })
                            .then(picResponse => console.log("image enregistrée"))
                            .catch(err => console.log("image pas enregistrée"));
                        }
                        else
                            throw response;
                        
                    })
                    .catch(err =>{
                        err.text()
                        .then(message => console.log(message));
                    });
            });
    }

    // Upload image
    // const uploadPic = (e) => {
    //     fetch(`${config.API_URL}/image/store`)
    //         .then(response => console.log("ok"))
    //         .catch(err => console.log("nok"));

    // }

    // const testDBClick = (e) => {
    //     fetch(`${config.API_URL}/making/get-byname`)
    //         .then(response => response.blob())
    //         .then(blob => setTestDB(URL.createObjectURL(blob)))
    //         .catch(err => console.log("nok"));
    // }

    /* Fonctions */
    // Convertion fichier image en binaire
    const fileToBinary = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(picture);
    });

    return (
        <section id="adminContainer">
            <h3 className="pageTitle">Admin</h3>
            <div id="addMakingContainer">
                <h4>Ajout d'une réalisation</h4>
                <form id="addMakingForm" className="formContainer">
                    <div id="makingPicContainer">
                        <span className="labelRow">Image : {picture ? <b>{picture.name}</b> : null}</span>
                        {makingBinaryPic ? <img id="makingPicPreview" src={URL.createObjectURL(makingBinaryPic)} alt="Preview réalisation" />
                        :<div id="makingPicPreview"/>}
                        <label id="makingPicLabel" className="formButton" htmlFor="makingPic">Choisir un fichier</label>
                        <input type="file" id="makingPic" name="makingImage" accept="image/png, image/jpg" onChange={imageloading} />
                    </div>
                    <div id="makingInfoContainer">
                        <label className="labelRow" htmlFor="makingInput-title">Titre :</label>
                        <input type="text" id="makingInput-title" onChange={dataInput} />
                        <label className="labelRow" htmlFor="makingInput-link">Lien :</label>
                        <input type="text" id="makingInput-link" onChange={dataInput} />
                        <label className="labelRow" htmlFor="makingInput-info">Détails :</label>
                        <textarea type="text" id="makingInput-info" onChange={dataInput} />
                    </div>
                </form>
                <button className="formButton" onClick={sendMaking}>Envoyer</button>
            </div>
            {/* <div>
                <button onClick={testDBClick}>Test</button>
                {testDB ?
                    <div>
                        <div>Name</div>
                        <img src={testDB} />
                    </div>
                    : null}
            </div> */}
            {!isAdmin ? <Redirect to="/accueil" /> : null}
        </section>
    )
}

export default AdminPannel;

