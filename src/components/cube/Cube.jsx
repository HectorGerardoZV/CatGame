

import "./Cube.css"

import O from "../../img/o.png"
import X from "../../img/x.png"


const Cube = (props) => {

    const { cube, handleClickCube, winner } = props;
    const { used, turn } = cube;
    const addItem = () => {
        if (!winner.state) {
            if (!used) {
                handleClickCube(cube);
            }
        }

    }

    return (
        <div className="cube cubeContent"
            onClick={addItem}
        >
            {
                used ? (<img src={`${turn == "0" ? X : O}`} alt="" />) : null
            }
        </div>
    )
}

export default Cube