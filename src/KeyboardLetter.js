import PropTypes from 'prop-types'
import React from 'react'

const KeyboardLetter = ({letter, index, feedback, onClick}) => (
    <span className={`letter ${feedback}`} onClick={() => onClick(index)} >
        <span className="symbol">
            {letter}
        </span>
    </span>
);

KeyboardLetter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        "discovered",
        "undiscovered",
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default KeyboardLetter