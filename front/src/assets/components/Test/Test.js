// Dépendances
import { useState, useRef } from "react";
// Style
import "./style.css";

// Page de test
const Test = () => {
    // Variables d'état
    const [mouseX, setMouseX] = useState(0);
    const [actRotation, setActRotation] = useState(0);
    // Rérférences
    const cubeRef = useRef(null);

    // Handle
    const moveCube = (e) => {
        // setActRotation(actRotation - (mouseX - e.screenX));
        setActRotation(actRotation - (mouseX - e.screenX));
        setMouseX(e.screenX);
        cubeRef.current.style.transform = `rotateY(${actRotation}deg)`;
    };
    const mouseEnter = (e) => {
        setMouseX(e.screenX);
    };

    return (
        <section id="testContainer">
            <div id="container3d" onMouseMove={moveCube} onMouseEnter={mouseEnter}>
                <div id="cube" ref={cubeRef}>
                    <div className="face f1">1</div>
                    <div className="face f2">2</div>
                    <div className="face f3">3</div>
                    {/* <div className="face f4">4</div>
                    <div className="face f5">5</div>
                    <div className="face f6">6</div> */}
                </div>
            </div>
        </section>
    )
}

export default Test;