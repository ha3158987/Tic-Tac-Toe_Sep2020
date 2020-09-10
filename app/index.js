// ================================
// START YOUR APP HERE
// ================================

const greeting = document.querySelector(".greeting");
const character = document.querySelectorAll(".character");

const tBox = document.querySelector(".tic-tac-toe");
const tCell = [
  //:nth-child()는 형제 사이에서의 순서에 따라 요소를 선택. li:nth-child(2) = 목록의 두번째 li
  document.querySelectorAll(".row:nth-child(1) > .cell"), //row 첫번째 줄에 있는 cell 3칸
  document.querySelectorAll(".row:nth-child(2) > .cell"),
  document.querySelectorAll(".row:nth-child(3) > .cell"),
];
const allCell = document.querySelectorAll(".cell");

const X_turn = "X";
const O_turn = "O";
const EMPTY = "empty";

let currentPlayer;

selectCharacter();

function selectCharacter() {
  tBox.classList.add(X_turn);
  tBox.classList.add(O_turn);

  character.forEach((element) =>
    element.addEventListener("click", clickCharacter)
  );
}

function clickCharacter(event) {
  let pick = event.target.classList[1]; //anna or elsa

  if (pick === "anna") {
    tBox.classList.remove(O_turn);
    currentPlayer = X_turn;
  } else if (pick === "elsa") {
    tBox.classList.remove(X_turn);
    currentPlayer = O_turn;
  }

  greeting.classList.add("invisible");
  startGame();
}

function startGame() {
  character.forEach((element) =>
    element.removeEventListener("click", clickCharacter)
  );

  allCell.forEach((cell) => cell.classList.add(EMPTY));

  paintAllEmptyCell();

  allCell.forEach((cell) => cell.addEventListener("click", processClick));
}

function processClick(event) {
  let cell = event.target;

  if (isEmpty(cell)) {
    markPlayerOnCell(cell);

    let winner = judge(currentPlayer);

    if (!winner) {
      changeTurn();
    } else {
      gameOverMsg(winner);
    }
  } else {
    alert("다른 칸을 선택하세요.");
  }
}

function isEmpty(cell) {
  return cell.classList.contains(EMPTY); //boolean 반환
}

function paintAllEmptyCell() {
  allCell.forEach((cell) => {
    if (isEmpty(cell)) cell.textContent = currentPlayer;
  });
}

function markPlayerOnCell(cell) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tCell[i][j] === cell) {
        cell.classList.remove(EMPTY);
        cell.classList.add(currentPlayer);
      }
    }
  }
}

function changeTurn() {
  currentPlayer = currentPlayer === X_turn ? O_turn : X_turn;

  tBox.classList.toggle(X_turn);
  tBox.classList.toggle(O_turn);

  paintAllEmptyCell();
}

//승자를 가리는 로직
function judge(player) {
  let count = [0, 0, 0, 0];
  let notEmpty = 0;

  for (var i = 0; i < 3; i++) {
    count[0] = count[1] = 0;
    for (var j = 0; j < 3; j++) {
      if (tCell[i][j].classList.contains(player)) count[0]++;
      if (tCell[j][i].classList.contains(player)) count[1]++;
      if (tCell[i][j].classList.contains(player) && i === j) count[2]++;
      if (tCell[i][j].classList.contains(player) && i + j === 2) count[3]++;

      if (!isEmpty(tCell[i][j])) notEmpty++;

      // count가 3이상의 숫자가 나올 때 승자리턴
      if (count.indexOf(3) >= 0) return player;
      // 9칸이 모두 채워졌을 때 무승부리턴
      if (notEmpty === 9) return "Draw";
    }
  }
}

function gameOverMsg(str) {
  let gameover = document.querySelector(".game-over");
  gameover.classList.remove("invisible");

  let msg = document.createElement("div");

  if (str === "Draw") {
    msg.textContent = "무승부입니다! 🕊️";
  } else {
    msg.textContent = `Player ${str}의 승리!`;
  }
  gameover.append(msg);

  let btn = document.createElement("div");
  btn.classList.add("restart");
  btn.textContent = "새 게임 하기";
  gameover.append(btn);

  btn.addEventListener("click", function () {
    window.location.reload();
  });

  allCell.forEach((cell) => cell.removeEventListener("click", processClick));
}
