// Style
import "./style.css"

// Composant Acceuil
const Home = () => {

    return (
        <div id="homeContainer">
            <div className="contentArticle">
                <div className="contentTitle">
                    <h4>Présentation</h4>
                </div>
                <div>
                    <div>Passionné par le développement à titre de loisir, j’ai décidé de réorienter ma carrière professionelle dans ce sens.</div>
                    <div>J’ai choisi le domaine du web et du mobile car il s’agit d’un secteur déjà profondément ancré dans notre société et l’avenir des marchés passera forcément par ces technologies.</div>
                </div>
            </div>
            <div className="contentArticle">
                <div className="contentTitle">
                    <h4>Parcours</h4>
                </div>
                <div>
                    <div>Initialement diplômé d'un BTS électronique, où j'y ai découvert mes premières expériences de code (programation de microcontrôleur en C), j'ai par la suite exploré en auto-didacte différents langages (C/C++, C#, VBA, ruby, lua...).</div>
                    <div>D'abord à titre de loisir en C# sur Unity 3D et le développement de quelques add-ons pour jeux vidéos en lua, j'ai pu utiliser ces compétences dans le cadre professionel avec du VBA pour la création de macro sur excel et de base de données Access, et en C# pour des logiciels standalone.</div>
                    <div>Pour concrétiser ma volonté de reconversion j'ai suivi une formation au Bocal Academy de Nice dans le domaine du développement web et mobile de développeur Fullstack.</div>
                </div>
            </div>
        </div>
    );
}

export default Home;