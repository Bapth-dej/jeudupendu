import React, { Component } from 'react'
import './App.css';
import KeyboardLetter from "./KeyboardLetter";

const EXPRESSIONS_ARRAY = ["expression à deviner", "chocolat", "aléatoire", "bout de pain", "bouteille", "savon", "world wide web"].map(expression => (
    expression.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().split("")
));

class App extends Component {
  state = {
    playing: false,
    //expression à deviner
    wordArray: null,
    alphabet: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    lettersClicked: [" "],
  }

  // fx flechee pour le binding
  startGame = () => {
    this.setState({
      playing: true,
      wordArray: EXPRESSIONS_ARRAY[Math.floor(Math.random() * EXPRESSIONS_ARRAY.length)],
      lettersClicked: [" "],
    })
  }

  // fx flechee pour le binding
  handleLetterClick = (letter) => {
    const {lettersClicked,} = this.state
    const letterDiscovered = lettersClicked.includes(letter)

    if ( !letterDiscovered ) {
      this.setState(prevState => ({lettersClicked: [...lettersClicked, letter],}))
    }
  }

  wordWithHiddenLetter () {
    const {wordArray, lettersClicked} = this.state

    return wordArray.map((letter,index) => (
        <span className={"wordLetter"} key={index}>
          { (lettersClicked.includes(letter)) ? <span className="symbol">{letter}</span> : <span className="symbol">_</span> }
        </span>
        )
    )
  }

  getFeedbackForLetter (letter) {
    const {lettersClicked} = this.state
    const letterMatched = lettersClicked.includes(letter)

    return letterMatched ? "clicked" : "notClicked"
  }

  hasWon() {
    const {wordArray, lettersClicked} = this.state

    return !wordArray.map((letter) => (
        lettersClicked.includes(letter)) ? letter : "_"
    ).includes("_")
  }

  render() {
    const {playing, wordArray, alphabet, lettersClicked,} = this.state

    return (
        <div className="App">
          <header className="App-header">
            <h1>Le jeu du Pendu !</h1>
          </header>

          <div className="jeudupendu">

            {playing ? (
                <div className="playing">
                  {this.hasWon() ? (
                      <div className="victory">
                        Vous avez gagné en {lettersClicked.length-1} coups
                      </div>

                  ) : (
                      <h2>Trouvez le(s) mot(s) ci-dessous, en {wordArray.filter(function (value) {
                        return value !== " "
                      }).length} lettres</h2>
                  )}
                  <div className="wordToFind">
                    {this.wordWithHiddenLetter(wordArray)}
                  </div>

                  {<div className="guesses">
                    Essais ratés : {lettersClicked.map((letter, index) => (
                          <span className="symbol" key={index}>{ (wordArray.includes(letter)) ? "" : letter}</span>
                      )
                  ) }
                  </div>}

                  <div className="keyboard">
                    {this.hasWon() ? (
                        <div className="victory">
                          <div className="startButton" onClick={this.startGame}>
                            <button>{"Recommencer"}</button>
                          </div>
                        </div>

                    ) : (
                        alphabet.map((letter, index) => (
                            <KeyboardLetter
                                letter={letter}
                                index={index}
                                key={index}
                                feedback={this.getFeedbackForLetter(letter)}
                                onClick={this.handleLetterClick}
                            />
                        ))
                    )}
                  </div>
                </div>
            ) : (
                <div className="startButton" onClick={this.startGame}>
                  <button>{"Commencer"}</button>
                </div>
            )}
          </div>
        </div>
    )
  }
}

export default App;
