// Dépendances
import { Switch, Route, Redirect } from "react-router";
// Composants
import Home from "../Home/Home";
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
        <Route exact path="/">
          <Redirect to="/accueil" />
        </Route>
        <Route path="/accueil">
          <Home />
        </Route>
        <Route path="/competences">
          <Wip />
        </Route>
        <Route path="/realisations">
          <Wip />
        </Route>
        <Route path="/contact">
          <Wip />
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