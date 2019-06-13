import React, { Component } from 'react'
import './App.css';
import KeyboardLetter from "./KeyboardLetter";

class App extends Component {
  state = {
    wordArray: "expression à deviner".normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().split("").map((letter, index) => ({letter: letter, index: index, feedback: "undiscovered"})),
    alphabet: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),//.map((letter, index) => ({letter: letter, index: index, feedback: "undiscovered", onClick: this.handleNewLetterClick})),
    lettersDiscovered: [],
    guesses: 0,
  }

  wordWithHiddenLetter(wordArray) {
    console.log("sentence ", wordArray)
    return wordArray.map((letter,index, feedback) => (
        (letter === " ") ? (
            <span>&#160;</span>
        ) : (
            (feedback === "discovered") ? <span>{letter}</span> : <span>_</span>)
        )
    )
  }

  // fx fleche pour acceder au state
  handleNewLetterClick = (indexLetter) => {
    let newAlphabet = this.state.alphabet
    newAlphabet[indexLetter][1] = "discovered"
    var newWordArray = this.state.wordArray

    this.setState({alphabet: newAlphabet})
  }

  handleOldLetterClick(index) {
    console.log("known : ", index)
  }

  render() {
    const {wordArray, alphabet, lettersDiscovered, guesses} = this.state

    return (
        <div className="App">
          <header className="App-header">
            <h1>Le jeu du Pendu !</h1>
          </header>

          <div className="jeudupendu">
            <div className="wordToFind">
              {this.wordWithHiddenLetter(wordArray)}
            </div>

            <div className="guesses">
              nombre d'essais : {guesses }
            </div>

            <div className="keyboard">
              {alphabet.map((letter, index) => (
                  <KeyboardLetter
                      letter={letter}
                      index={index}
                      key={index}
                      feedback={feedback}
                      onClick={feedback==="undiscovered" ? this.handleNewLetterClick : this.handleOldLetterClick}
                  />
              ))}
            </div>
          </div>
        </div>
    )
  }
}

export default App;
