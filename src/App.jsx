import "./App.css"
import { useState, useEffect } from "react";
import one from "./assets/one.jpg";
import two from "./assets/two.webp";
import three from "./assets/three.webp";
import four from "./assets/four.png";
import five from "./assets/five.jpg";
import six from "./assets/six.png";
import dice from "./assets/dice.mp3";
import ladder from "./assets/ladder.mp3";
import snakebite from "./assets/snakebite.mp3";
import win from "./assets/win.mp3";
const Snakes = {
   95: 36, 92: 52,  81: 78,  50: 16,  40: 20 
  };
  const ladders ={
    4: 22, 10: 29, 14: 77, 33: 51,64: 82, 74: 90
  };
  const diceAudio = new Audio(dice);
  const ladderAudio = new Audio(ladder);
  const snakebiteAudio = new Audio(snakebite);
  const winAudio = new Audio(win);
function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [turn, setTurn] = useState("green");
  const [diceNumber,setDiceNumber] =useState(0);
  const [win, setWin] = useState("");
  const [gameOver , setGameOver] = useState(false);
  const [images , setImages] = useState("");
  const board = [];
  for (let i = 9; i >= 0; i--) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      let number = i * 10 + (i % 2 === 0 ? j + 1 : 10 - j);
      row.push(
        <div key={number} id={`b${number}`} className="cell">
        </div>
      );
    }
    board.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  const randomNumber = () => {
  if(gameOver==false){
    const dice = Math.floor(Math.random() * 6) + 1;
    if(dice==1){
      setImages(one)
    }
    if(dice==2){
      setImages(two)
    }if(dice==3){
      setImages(three)
    }
    if(dice==4){
      setImages(four)
    }
    if(dice==5){
      setImages(five)
    }
    if(dice==6){
      setImages(six)
    }
    setDiceNumber(dice);
    diceAudio.play();
    if (turn === "red") {
      let next = num1 + dice <= 100 ? num1 + dice : num1;
      if(next===100){
        setWin("red winner")
        winAudio.play();
           setGameOver(true)
      }
      else if(Snakes[next]){
        next =Snakes[next]
        snakebiteAudio.play();
      }
     else if(ladders[next])
      {
         next =ladders[next]
         ladderAudio.play();
      }
        setNum1(next);
      setTurn("green");
    } else {
      let next = num2 + dice <= 100 ? num2 + dice : num2;
      if(next===100){
        setWin("green win")
        setGameOver(true)
      }
     else if(Snakes[next]){
        next =Snakes[next]
         snakebiteAudio.play();
         setNum2(next);
      }
      else if(ladders[next])
      {
         next =ladders[next]
         ladderAudio.play();
      }
       setNum2(next);
      setTurn("red");
    }
  }
  };

  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      const cell = document.getElementById(`b${i}`);
      if (cell) {
        cell.style.backgroundColor = "";
       
      }
    }
   let player1Cell = document.getElementById(`b${num1}`);
let player2Cell = document.getElementById(`b${num2}`);

if (player1Cell && player2Cell && num1 === num2) {
  player1Cell.style.background = "linear-gradient( red, green)";
} else {
  if (player1Cell) {
    player1Cell.style.background = "red";
  }
  if (player2Cell) {
    player2Cell.style.background = "green";
  }
}

  });
  return (<>
      <h1 className="head">🐍Snake and 🪜Ladder</h1><br></br>
      <br /><div className ="changes">
      <button  className= "button" onClick={randomNumber}>Roll Dice</button>
       <p>Turn: Player {turn}</p>
      <p>Dice number is : {diceNumber}</p>
      <p>Player red: {num1}</p>
      <p>Player green: {num2}</p>
       <img src ={images} height= "50px" width =" 50px"></img>
       <p>{win}</p>
       <div className="board">
        {board}
        </div>
      </div>
      <p>{gameOver}</p>
      
</>
  );
}
export default App;
