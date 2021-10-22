// Dépendances
import { Switch, Route, Redirect } from "react-router";
// Composants
import Home from "../Home/Home";
import Skills from "../Skills/Skills";
import Contact from "../Contact/Contact";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import AccountValidation from "../AccountValidation/AccountValidation";
import ForgottenPwd from "../ForgottentPwd/ForgottentPwd";
import ResetPassword from "../ResetPassword/ResetPassword";
import Wip from "../Wip/Wip.js"
// Styles
import "./style.css"


// Header du site
const Body = () => {
  return (
    <div id="contentContainer">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/accueil" />
        </Route>
        <Route path="/accueil">
          <Home />
        </Route>
        <Route path="/competences">
          <Skills />
        </Route>
        <Route path="/realisations">
          <Wip />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/account-validation/:validationToken" >
          <AccountValidation />
        </Route>
        <Route path="/forgotten-password">
          <ForgottenPwd />
        </Route>
        <Route path="/reset-password/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
};

export default Body;