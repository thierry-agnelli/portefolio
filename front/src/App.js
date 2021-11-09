// Dépendances
import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Browser } from "react-router-dom";
// Composants
import Banner from './assets/components/Banner/Banner';
import Body from './assets/components/Body/Body';
import Footer from "./assets/components/Footer/Footer";
// Styles
import './App.css';
// Méthodes
import { checkLoggedUser } from "./assets/lib/logMethod";


// Contexte
export const AppContext = createContext();

function App() {
  /* Variebles d'états */
  const [user, setUser] = useState(null);

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
          <Footer/>
        </div>
      </Browser>
    </AppContext.Provider>
  );
}

export default App;
