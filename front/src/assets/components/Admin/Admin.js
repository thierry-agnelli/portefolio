// Dépendances
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
// Contexte
import { AppContext } from "../../../App";
// Config
import config from "../../../config.json";

// Panneau admin
const Admin = () => {
    // Contexte
    const context = useContext(AppContext);
    // Variables d'états
    const [user, setUser] = useState(context.getUser());
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        // let user = context.getUser();
        // setUser(context.getUser());
        // console.log(user);
        console.log("useEffect");
        console.log(context.getUser());
        if (context.getUser()) {
            console.log("fetch")
        //     fetch(`${config.API_URL}/user/is-admin`)
        //         .then(response => console.log("ok"))
        //         .catch(err => console.log("nok"));
        }
    }, [context.getUser()]);

    // useEffect(() => {
    //     console.log(user);
    // },[user])

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
// 