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

    return (
        <div>
            <div className="contentTitle">
                <h4>Présentation</h4>
            </div>
            <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi voluptatum excepturi odio eveniet soluta nesciunt alias id natus ex nisi voluptates, neque quasi dolorem facere molestias, quod beatae delectus. Soluta!</p>
            </div>
        </div>
    );
}

export default Home;