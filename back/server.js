// Dépendances
import http from "http";
import colors from "colors";
import mongoose from "mongoose";
// App
import app from "./app.js";
// Lib
import { promptLog } from "./lib/logs.js";

// Création serveur
const port = process.env.PORT || 3001;
app.set("port", port);
const server = http.createServer(app);

// Démarrage serveur
server.listen(port);
// Erreur serveur
server.on("error", (err) =>{
    promptLog(`Error on server start: ${err}`,"red")
});
// Serveur OK
server.on("listening", () =>{
    promptLog(`Server started on port: ${port}`, "blue");
});


// Connexion base de données
mongoose.connect(process.env.SCALINGO_MONGO_URL || "mongodb://localhost:27017/tagnel",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    promptLog("Database connection OK.".blue);
})
.catch((err) => {
    promptLog(`Database connection error: ${err}`, "red");
});

