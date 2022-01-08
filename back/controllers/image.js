// Modèle
import Image from "../models/Image.js";
// Lib
import { promptLog } from "../lib/logs.js";

// Contrôleur Image
const imageController = {    
    getByName: (req, res) => {
        promptLog(`Get image : ${req.params.name}`, "yellow");
        // Recherche image en base
        Image.findOne({name: req.params.name})
        .then(result => {
            //renvoie de l'image si elel a été trouvée
            if(result){
                res.setHeader("contentType", result.contentType);
                res.status(200).send(result.binary);
            }
            else
                throw "image not found";
        })
        .catch(err => res.status(400).send(err));
    }
};

export default imageController;