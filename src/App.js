import React, { useState, useEffect, Children } from "react";
import Words from "./components/Words";
import Container from "./components/Container";
import Typeracer from "./components/Typeracer";
import Results from "./components/Results";
import "./styles.css";

function App() {
  const [word, setWord] = useState(Words);
  const [newWord, setNewWord] = useState(Words[0]); //initial state
  const [disabled, setDisabled] = useState(true); //initially beform start typing it is diabled,,when we click on start it will we enabled.
  const [correctResults, setCorrectResults] = useState([]); //for checking results true current word
  const [wrongResults, setWrongResults] = useState([]); //for wrong results
  const [countCorrect, setCountCorrect] = useState(0); //correct answers number on top
  const [time, setTime] = useState(30); //initial 30 seconds time
  const [inputValue, setInputValue] = useState(""); //for input values
  const [animation, setAnimation] = useState(null); //for animation at last 10 seconds
  //console.log(word.length);
  let randomWord = Math.floor(Math.random() * word.length); //word is from word we set at usestate(Words)
  //console.log(word[randomWord]);

  //to check answers
  const checkAnswers = () => {
    if (inputValue.trim() === newWord) {
      setCorrectResults((prevCorrect) => [...prevCorrect, newWord]);
      setCountCorrect((prevCorrect) => prevCorrect + 1);
      return;
    }
    setWrongResults((prevWrong) => [...prevWrong, inputValue]);
  };

  // to handle input
  const handleInput = (e) => {
    if (e.charCode === 13 && inputValue.trim() !== "") {
      checkAnswers();
      setNewWord(word[randomWord]);
      setInputValue("");
    }
  };

  //to start
  const handleStart = () => {
    setDisabled(!disabled); //to show typing word in input box
    setCorrectResults([]); //empty array when we start the game
    setWrongResults([]); //empty array when we start the game
    setCountCorrect(0); //0 when we start the game
    setInputValue(""); //empty string when we start the game
  };

  //for time
  useEffect(() => {
    if (time <= 30 && time !== 0 && disabled === false) {
      setTimeout(() => setTime((prevtime) => prevtime - 1), 1000);
    } else if (disabled) {
      setTime(30);
      setAnimation(null);
    } else if (time === 0) {
      setDisabled(true);
    }

    if (time <= 10) {
      setAnimation("scaleNumber 2s infinite");
    }
  }, [disabled, time]);

  //to set new word
  useEffect(() => {
    setNewWord(word[randomWord]);
  }, []);

  return (
    <div className="App">
      <Container />
      <Typeracer
        newWord={newWord}
        inputValue={inputValue}
        setInputValue={setInputValue}
        disabled={disabled}
        time={time}
        animation={animation}
        handleInput={handleInput}
        handleStart={handleStart}
      />
      <Container />
      <Results
        correctResults={correctResults}
        wrongResults={wrongResults}
        countCorrect={countCorrect}
      />
    </div>
  );
}

export default App;
