// here is setting selection
let winnerNumberIs = document.querySelector("#setSetting h5 span");
let getInputValue = document.querySelector("#setSetting input");
let setWinnerValue = document.querySelector("#setSetting #submit");
let resetBtn = document.querySelector("#setSetting #reset");
//  here is checkmate display players selection
let checkmate = document.querySelector("#checkmate");
let checkmateDisplay = document.querySelector("#checkmate h3 span");
// playerOne selection
let playerOne = document.querySelector("#playerOne");
// playerTwo selection
let playerTwo = document.querySelector("#playerTwo");
// playerThree selection
let playerThree = document.querySelector("#playerThree");
// history selection
let history = document.querySelector("#history");

// Global Variable
let winnerNumber = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
let winner = false;

// set winner value and reset all
setWinnerValue.addEventListener("click", function () {
  let inputValue = getInputValue.value;
  try {
    if (inputValue == "") throw "Input is empty";
    if (isNaN(inputValue)) throw "is not a number";
    if (inputValue === "0" || inputValue === "1") throw "at least 2 number";
    inputValue = Number(inputValue);
    getInputValue.classList.remove("border-danger");
    winnerNumber = inputValue;
    winnerNumberIs.innerHTML = winnerNumber;
    enableBtn(playerOne);
    enableBtn(playerTwo);
    enableBtn(playerThree);
  } catch (err) {
    getInputValue.classList.add("border-danger");
  } finally {
    getInputValue.value = "";
  }
});
function rest() {
  function playerReset(parent, score) {
    parent.children[0].innerHTML = score;
    disableBtn(parent);
    parent.children[2].innerHTML = "";
    parent.classList.remove("bg-success", "text-light");
    parent.children[1].classList.remove("btn-warning", "fw-bold");
  }
  winnerNumber = 0;
  winnerNumberIs.innerHTML = winnerNumber;
  playerOneScore = 0;
  playerTwoScore = 0;
  playerThreeScore = 0;
  checkmateDisplay.innerHTML = "0";
  winner = false;
  playerReset(playerOne, playerOneScore);
  playerReset(playerTwo, playerTwoScore);
  playerReset(playerThree, playerThreeScore);
  history.children[1].innerHTML = "";
}
resetBtn.addEventListener("click", rest);

playerOne.children[1].addEventListener("click", function () {
  if (!winner) {
    players(playerOne, playerOneScore);
  }
});
playerTwo.children[1].addEventListener("click", function () {
  if (!winner) {
    players(playerTwo, playerTwoScore);
  }
});
playerThree.children[1].addEventListener("click", function () {
  if (!winner) {
    players(playerThree, playerThreeScore);
  }
});

function players(parent, score) {
  score = Math.floor(Math.random() * winnerNumber) + 1;
  parent.children[0].innerHTML = score;
  checkmateDisplay.innerHTML = score;
  let li = document.createElement("li");
  li.classList = "list-group-item";
  li.innerText = score;
  parent.children[2].insertBefore(li, parent.children[2].childNodes[0]);
  palyersHistory(history, score, parent);
  if (score === winnerNumber) {
    winner = true;
    parent.classList.add("bg-success", "text-light");
    parent.children[1].classList.add("btn-warning", "fw-bold");
    disableBtn(playerOne);
    disableBtn(playerTwo);
    disableBtn(playerThree);
  }
}
function disableBtn(parent) {
  parent.children[1].setAttribute("disabled", "disabled");
}
function enableBtn(parent) {
  parent.children[1].removeAttribute("disabled");
}
function palyersHistory(hisParent, score, eventParent) {
  let li = document.createElement("li");
  li.classList = "list-group-item";
  if (eventParent.id === "playerOne") {
    li.innerText = `PlayerOne ${score}`;
  } else if (eventParent.id === "playerTwo") {
    li.innerText = `PlayerTwo ${score}`;
  } else if (eventParent.id === "playerThree") {
    li.innerText = `PlayerThree ${score}`;
  }
  hisParent.children[1].insertBefore(li, hisParent.children[1].childNodes[0]);
}
