// Modèle
import Image from "../models/Image.js";

// Contrôleur Image
const imageController = {
    getByName: (req, res) => {
        console.log(req.params.name);

        Image.findOne({name: req.params.name})
        .then(result => {
            console.log(result);
            res.setHeader("contentType", result.contentType);
            res.status(200).send(result.binary);
            // res.status(200).json(result);
        })
        .catch(err => res.status(400).send(err));
    }
};

export default imageController;