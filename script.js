const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  // const ResetPattern = new ResetPattern(board)
  let turn = 0;

  this.start = function () {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  };

  this.clickHandler= function() {
    board.resetPattern()
  }

  
}

function Board() {
  this.positions = Array.from(document.querySelectorAll('.col'));

  this.checkForWinner = function () {
    let winner = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    const positions = this.positions;
    var wins = document.getElementById("wins")
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText; 
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningComboX = pos0InnerText !== '' &&
        pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isWinningComboX) {
        if (pos2InnerText == "X") {
          // alert("X wins")
          wins.innerHTML = "X wins"
        }
        else {
          // alert("O wins")
          wins.innerHTML = "O wins"
        }
        // winningCombo.forEach((index) => {
        //   positions[index].className += ' winner';
        // })
      }
    });

    return winner;
  }

  this.resetPattern= function() {console.log(this.positions)
    
    // this.positions.forEach((ele) => {
    //   this.positions[ele] = document.querySelector('.col');
      
    //   this.positions[ele].innerText = ""
    //   delete this.positions[ele]
    //   console.log("clicked")
    // })
    // for(var i=0; i<9; i++){
    //   this.positions[i] = document.querySelector('.col');
    //   this.positions[i].innerText = ""
    //   delete this.positions[i]
    // }
    // ticTacToeGame.start();
    location.reload()
    
  

  }
  
  
  
  
}

function ComputerPlayer(board) {
  // this.takeTurn = function() {
  //   let availablePositions = board.positions.filter((p) => p.innerText === '');
  //   const move = Math.floor(Math.random() * (availablePositions.length - 0));
  //   availablePositions[move].innerText = 'O';
  // }
  this.takeTurn = function () {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTakenP));
  }

  function handleTurnTakenP(event) {
    event.target.innerText = 'O';
    board.positions
      .forEach(el => el.removeEventListener('click', handleTurnTakenP));
  }
}

function HumanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    event.target.innerText = 'X';
    board.positions
      .forEach(el => el.removeEventListener('click', handleTurnTaken));
  }


}

var reset = document.querySelector("#reset");
  reset.addEventListener("click", ticTacToeGame.clickHandler,false);



