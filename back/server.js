// Dépendances
import http from "http";
import colors from "colors";
import mongoose from "mongoose";
// App
import app from "./app.js";

// Création serveur
const port = process.env.PORT || 3001;
app.set("port", port);
const server = http.createServer(app);

// Démarrage serveur
server.listen(port);
// Erreur serveur
server.on("error", (err) =>{
    console.log(`Error on server start: ${err}`.red)
});
// Serveur OK
server.on("listening", () =>{
    console.log(`Server started on port: ${port}`.blue);
});

// Connexion base de données
mongoose.connect(process.env.PORT || "mongodb://localhost:27017/tagnel",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("Database connection OK.".blue);
})
.catch((err) => {
    console.log(`Database connection error: ${err}`);
});

