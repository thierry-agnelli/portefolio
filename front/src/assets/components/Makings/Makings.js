// Style
import "./style.css"
// image
import imgNotFound from "../../medias/images/image-not-found.png";

// Page des réalisations
const Makings = () => {

    return (
        <div id="makingsContainer">
            <div className="pageTitle">
                <h3>Réalisations</h3>
            </div>
            <div id="makingsList">
                <div className="makingItem">
                    <img alt="app_image" src={imgNotFound}/>
                    <div className="makingItemInfos">
                        <div className="makingItemTitle">Item title</div>
                        <div>Item blah</div>
                    </div>
                </div>
                <div className="makingItem">
                    <img alt="app_image" src={imgNotFound}/>
                    <div className="makingItemInfos">
                        <div className="makingItemTitle">Item title</div>
                        <div>Item blah</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makings;
