// Dépendances
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
// Contexte
import { AppContext } from "../../../App";

// Panneau admin
const Admin = () => {
    // Contexte
    const context = useContext(AppContext);
    // Variables d'états
    const [user, setUser] = useState(context.getUser())
    const [isAdmin, setIsAdmin] = useState(true);
    

    useEffect(()=> {
        console.log(user);
        console.log(context.getUser());
        if(!context.getUser()){
            console.log("nop !");
            // setIsAdmin(false);
        }

    },[]);

    return (
        <div>
            <div className="pageTitle">
                <h3>Admin</h3>
            </div>
            {!isAdmin ? <Redirect to="/accueil" /> : null}
        </div>
    )
}

export default Admin;
