import PropTypes from "prop-types";
import React from "react";

export const KeyboardLetter = ({ letter, index, feedback, onClick }) => (
  <span
    className={`letter${feedback}`}
    onClick={() => onClick(letter)}
    key={index}
  >
    <span className="symbol"> {letter} </span>
  </span>
);

KeyboardLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf(["clicked", "notClicked"]).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export const ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
