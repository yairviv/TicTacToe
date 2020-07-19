import React, { useState, useEffect } from 'react';
import SquareComponent from "./SquareComponent";
import './mainCss.css';
import { connect } from 'react-redux';
import { updateBoard, initBoard } from '../redux/actions/index';

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateBoard: (updateObj) => dispatch(updateBoard(updateObj)),
    initBoard: () => dispatch(initBoard()),
});

const mapStateToProps = (state) => {
    return { board: state.board || {} }
}

function MainComponent(props) {
    const [player, setPlayer] = useState('X');
    const [resetFlag, setResetFlag] = useState(false);

    useEffect(() => props.initBoard(),
        [resetFlag])

    function onClick(line, index, input) {
        let newPlayer = player == 'X' ? 'O' : 'X';
        let updateObj = {
            line: line,
            index: index,
            input: input,
            _id: props.board._id
        }
        props.updateBoard(updateObj)
        setPlayer(newPlayer)
    }


    return (
        <div>
            <h1>Tic Tac Toe!</h1>
            <h2>Classic game for two players. X always starts.</h2>
            {props.board.winner === undefined &&

                <h3>Current player: {player}</h3>

            }
            <div className="board">
                <SquareComponent onClick={onClick} currentPlayer={player} line={1} index={0}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={1} index={1}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={1} index={2}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={2} index={0}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={2} index={1}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={2} index={2}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={3} index={0}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={3} index={1}></SquareComponent>
                <SquareComponent onClick={onClick} currentPlayer={player} line={3} index={2}></SquareComponent>
            </div>
            {props.board.winner !== undefined &&
                <h2>
                    The winner is  {props.board.winner} !
        </h2>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)