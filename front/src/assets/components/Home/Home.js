// Dépendances
import { useContext } from "react";
// Context
import { AppContext } from "../../../App";
// Style
import "./style.css";

// Composant Acceuil
const Home = () => {
    // Context
    const context = useContext(AppContext);

    return(
        <div>
            <div>Ici il y aura du contenu</div>
        </div>
    );
}

export default Home;