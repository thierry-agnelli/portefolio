// Config
import config from "../../config.json";

// Vérifications si l'utilisateur est connecté
export const checkLoggedUser = (setUser) => {
    // Vérifications des données Storage
    let loggedUser = null;
    if (localStorage.getItem("session"))
        loggedUser = JSON.parse(localStorage.getItem("session"));
    else if (sessionStorage.getItem("session"))
        loggedUser = JSON.parse(sessionStorage.getItem("session"));

    // Si des données utilisateurs ont été trouvées
    if(loggedUser){
        // Vérification si le token est toujours valide
        fetch(`${config.API_URL}/user/authToken-validation/${loggedUser.authToken}`)
            .then(response => {
                if (response.status === 200)
                    setUser(loggedUser);
                else
                    throw response;
            })
            .catch(err => {
                err.text()
                    .then(message => {
                        console.log(message);
                        // Nettoyage des informations erronées dans les storage 
                        localStorage.removeItem("session");
                        sessionStorage.removeItem("session");
                    });
            });
    }
};