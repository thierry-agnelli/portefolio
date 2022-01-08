// Dépendances
import { Switch, Route, Redirect } from "react-router";
// Composants
import Home from "../Home/Home";
import Skills from "../Skills/Skills";
import Experiences from "../Experiences/Experiences";
import Makings from "../Makings/Makings";
import Contact from "../Contact/Contact";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import AdminPannel from "../AdminPannel/AdminPannel";
import AccountValidation from "../AccountValidation/AccountValidation";
import ForgottenPwd from "../ForgottentPwd/ForgottentPwd";
import ResetPassword from "../ResetPassword/ResetPassword";
import Wip from "../Wip/Wip.js"
import Test from "../Test/Test.js"
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
        <Route path="/experiences">
          <Experiences />
        </Route>
        <Route path="/realisations">
          <Makings />
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
        <Route path="/user-profile">
          <Wip />
        </Route>
        <Route path="/admin">
          <AdminPannel />
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
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
    </div>
  );
};

export default Body;