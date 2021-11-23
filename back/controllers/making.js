// Modèle
import Making from "../models/Making.js";
// lib
import { promptLog } from "../lib/logs.js";

// Contrôleur Making
const makingController = {
    getAll: (req, res) => {
        promptLog("Getting all makings list", "yellow");

        res.status(200).json([
            {name: 1},
            {name: 2},
            {name: 3},
            {name: 4},
            {name: 5},
            {name: 6},
            {name: 7},
        ]);
    }
}

export default makingController;