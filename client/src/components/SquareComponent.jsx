import React, { useState } from 'react';
import './mainCss.css';

function SquareComponent(props) {
    const [input, setInput] = useState('');
    function handleClick() {
        setInput(props.currentPlayer);
        props.onClick(props.line, props.index, props.currentPlayer);
    }
    return (
        <label onClick={handleClick} className="field">{input}</label>
    );
}

export default SquareComponent