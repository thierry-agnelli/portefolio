// Dépendances
import { Buffer } from "buffer";
// Modèle
import Making from "../models/Making.js";
import Image from "../models/Image.js"
// lib
import { promptLog } from "../lib/logs.js";

// Contrôleur Making
const makingController = {
    getAll: (req, res) => {
        promptLog("Getting all makings list", "yellow");

        Making.find().sort("-uploadingDate")
        .then(result => {
            res.status(200).json(result);
        })

        // res.status(200).json([
        //     { title: 1 },
        //     { title: 2 },
        //     { title: 3 },
        //     { title: 4 },
        //     { title: 5 },
        //     { title: 6 },
        //     { title: 7 },
        // ]);
    },
    store: (req, res) => {
        promptLog(`Storing new making: ${req.body.title}`, "yellow");

        // Création d'un buffer en base64 de l'image
        const binaryBuffer = Buffer.from(req.body.picture.binary, "base64");

        // Création nouvelle entrée
        const newMaking = new Making({
            title: req.body.title,
            link: req.body.link,
            details: req.body.details,
            pictureName: req.body.picture.name,
            uploadingDate: Date.now()
        });

        // Enregistrement
        newMaking.save()
            .then(result => {
                promptLog(`New making ${result.title} has been saved`, "green");
                promptLog(`Storing Image ${req.body.picture.name}`, "yellow")

                const newImage = new Image({
                    name: req.body.picture.name,
                    binary: binaryBuffer,
                    contentType: req.body.picture.contentType
                });

                newImage.save()
                    .then(result => {
                        promptLog(`Image ${result.name} has been saved`, "green")
                        res.status(200).send("New making registered");
                    })
                    .catch(err => {
                        throw err;
                    });
            })
            .catch(err => {
                promptLog(err.message, "red");
                res.status(400).send(err.message);
            });
    }
};

export default makingController;