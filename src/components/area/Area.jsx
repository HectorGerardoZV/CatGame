import { useState, useEffect } from "react"
import { useId } from "react";
import Cube from "../cube/Cube";


import "./Area.css"
const Area = () => {

    const [items, setItems] = useState([
        [{ turn: "", x: 0, y: 0, used: false }, { turn: "", x: 0, y: 1, used: false }, { turn: "", x: 0, y: 2, used: false }],
        [{ turn: "", x: 1, y: 0, used: false }, { turn: "", x: 1, y: 1, used: false }, { turn: "", x: 1, y: 2, used: false }],
        [{ turn: "", x: 2, y: 0, used: false }, { turn: "", x: 2, y: 1, used: false }, { turn: "", x: 2, y: 2, used: false }]
    ]);
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState({ player: -1, state: false });
    const [currentCube, setCurrentCube] = useState({});
    const [winns, setWinns] = useState({ player1: 0, player2: 0, ties: 0 })

    const handleClickCube = (cube) => {
        const { x, y } = cube;
        let cubeClicked = {}
        const newItems = items.map(array => {
            return array.map(item => {
                if (x != item.x || y != item.y) {
                    return item;
                } else {
                    const newItem = { ...item };
                    newItem.used = true;
                    newItem.turn = `${player}`
                    cubeClicked = newItem;

                    return newItem;
                }
            })
        })
        setItems(newItems);
        setCurrentCube(cubeClicked)

    }
    const togglePlayer = () => {
        if (player == 0) {
            setPlayer(1)
        } else {
            setPlayer(0)
        }
    }
    const checkPlay = (cube) => {
        if (Object.keys(currentCube).length != 0) {
            const { x, y } = cube;
            const result = checkVertical(x, y)
            if (result.state) {
                setWinner(result)
                if (result.player == 0) {
                    setWinns({ ...winns, player1: winns.player1 + 1 })
                } else {
                    setWinns({ ...winns, player2: winns.player2 + 1 })
                }
                return;
            }
            const result2 = checkDiagonal()
            if (result2.state) {
                setWinner(result2)
                if (result2.player == 0) {
                    setWinns({ ...winns, player1: winns.player1 + 1 })
                } else {
                    setWinns({ ...winns, player2: winns.player2 + 1 })
                }
                return;
            }
            const completed = checkBoard()
            if(completed){
                setWinns({ ...winns, ties: winns.ties + 1 })
            }
            togglePlayer();
        }


    }
    const checkDiagonal = () => {
        let cubes1 = []
        let cubes2 = [];
        let reverse = items.length - 1
        for (let i = 0; i < items.length; i++) {
            const array = items[i];
            for (let j = 0; j < array.length; j++) {
                if (i == j) {
                    cubes1.push(array[j]);
                    cubes2.push(array[reverse])
                    reverse--
                }
            }

        }



        const event = (item) => item.used == false;
        const lineX = cubes1.some(event);
        const lineY = cubes2.some(event);

        if (lineX && lineY) {
            return { player: -1, state: false };
        }

        if (!lineX) {
            if (cubes1.filter(item => item.turn == player).length == 3) {
                return { player, state: true }
            }
        } else if (!lineY) {
            if (cubes2.filter(item => item.turn == player).length == 3) {
                return { player, state: true }
            }
        }

        return { player: -1, state: false };


    }
    const checkVertical = (x, y) => {
        let cubesX = [...items[x]]
        let cubesY = [];
        for (let i = 0; i < items.length; i++) {
            const array = items[i];
            for (let j = 0; j < array.length; j++) {
                const cube = array[j];
                if (cube.y == y) {
                    cubesY.push(cube)
                }
            }

        }

        const event = (item) => item.used == false;
        const lineX = cubesX.some(event);
        const lineY = cubesY.some(event);

        if (lineX && lineY) {
            return { player: -1, state: false };
        }

        if (!lineX) {
            if (cubesX.filter(item => item.turn == player).length == 3) {
                return { player, state: true }
            }
        } else if (!lineY) {
            if (cubesY.filter(item => item.turn == player).length == 3) {
                return { player, state: true }
            }
        }

        return { player: -1, state: false };


    }
    const checkBoard = ()=>{
        let completed = true;
        
        items.forEach(array=>{
            array.forEach(item=>{
                if(!item.used){
                    completed= false;
                    return;
                }
            })
            if(!completed){
                return;
            }
        })

        return completed;
        
    }
    const handleOnClickRestart = () => {
        const reset = items.map(array => {
            return array.map(item => {
                const newItem = { ...item }
                newItem.turn = ""
                newItem.used = false
                return newItem;
            })
        })
        setItems(reset)
        setWinner({ player: -1, state: false })
        setPlayer(0)
        setCurrentCube({})
    }
    const handleOnClickReset = () => {
        const reset = items.map(array => {
            return array.map(item => {
                const newItem = { ...item }
                newItem.turn = ""
                newItem.used = false
                return newItem;
            })
        })
        setItems(reset)
        setWinner({ player: -1, state: false })
        setPlayer(0)
        setCurrentCube({})
        setWinns({ player1: 0, player2: 0, ties:0 })
    }


    useEffect(() => {
        checkPlay(currentCube)

    }, [items])

    return (
        <div className="container">
            <div>
                {winner.state ?
                    (<h1 className="winner">Winner: {player == 0 ? "X" : "O"}</h1>)
                    : (<h1 className="winner">Winner: </h1>)}
                <div className="infoPlayers">
                    <h1>Player X: {winns.player1}</h1>
                    <h1>Player O: {winns.player2}</h1>
                    <h1>Ties: {winns.ties}</h1>


                </div>

                <div className="options">
                    <button onClick={handleOnClickRestart}>Restart</button>
                    <h1>Turn: {player == 0 ? "X" : "O"}</h1>
                    <button onClick={handleOnClickReset}>Reset</button>
                </div>

                <div className="board">
                    {
                        items.map(array => (
                            array.map(item => (
                                <Cube
                                    key={useId()}
                                    cube={item}
                                    handleClickCube={handleClickCube}
                                    player={player}
                                    winner={winner}
                                />
                            ))
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Area