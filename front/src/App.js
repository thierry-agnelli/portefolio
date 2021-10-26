// Dépendances
import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Browser } from "react-router-dom";
// Composants
import Banner from './assets/components/Banner/Banner';
import Body from './assets/components/Body/Body';
// Styles
import './App.css';
// Méthodes
import { checkLoggedUser } from "./assets/components/lib/logMethod";


// Contexte
export const AppContext = createContext();

function App() {
  /* Variebles d'états */
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : null);

  /* Fonctions */
  const getUser = () => user;

  // Valeurs du contexte
  const contextValue = {
    setUser,
    getUser
  };

  // Vérification si l'utilisateur est connecté
  useEffect(() => checkLoggedUser(setUser), []);


  return (
    <AppContext.Provider value={contextValue}>
      <Browser>
        <div id="mainContainer">
          <Banner />
          <Body />
        </div>
      </Browser>
    </AppContext.Provider>
  );
}

export default App;
