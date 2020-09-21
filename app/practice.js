//프로젝트에 필요한 변수들을 global scope에 선언
const greeting = document.querySelector(".greeting");
const character = document.querySelectorAll(".character");
const tBox = document.querySelector(".tic-tac-toe");
const tCell = [
  document.querySelectorAll(".row:nth-child(1) > .cell"),
  document.querySelectorAll(".row:nth-child(2) > .cell"),
  document.querySelectorAll(".row:nth-child(3) > .cell"),
];
const allCell = document.querySelectorAll(".cell");

const X_turn = "X";
const O_turn = "O";
const EMPTY = "empty";

//재할당이 필요한 현재 player는 let으로 선언
let currentPlayer;
selectCharacter();

//시작과 동시에 캐릭터 선택지를 보여주는 함수 실행
function selectCharacter() {
  tBox.classList.add(X_turn);
  tBox.classList.add(O_turn);

  character.forEach((element) =>
    element.addEventListener("click", clickCharacter)
  );
}

//선택된 캐릭터를 보여주는 함수
function clickCharacter(event) {
  let pick = event.target.classList[1]; //classList: character anna/elsa

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

//게임로직을 세팅하는 함수
function startGame() {
  character.forEach((element) =>
    element.removeEventListener("click", clickCharacter)
  );

  allCell.forEach((cell) => cell.classList.add(EMPTY));

  paintAllEmptyCell();

  allCell.forEach((cell) => cell.addEventListener("click", processClick));
}

//클릭된 칸을 UI에 보여주는 함수
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
    //빈 칸이 아닌 경우
    alert("다른 칸을 선택하세요.");
  }
}

//칸이 비었는지 판단하는 함수
function isEmpty(cell) {
  return cell.classList.contains(EMPTY);
}

//빈칸에만 표시될 수 있게하는 함수
function paintAllEmptyCell() {
  allCell.forEach((cell) => {
    if (isEmpty(cell)) cell.textContent = currentPlayer;
  });
}

//UI에 선택된 칸들과 각 칸을 선택한 player를 보여주는 함수
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

//Player를 switch해주는 함수
function changeTurn() {
  currentPlayer = currentPlayer === X_turn ? O_turn : X_turn;

  tBox.classList.toggle(X_turn);
  tBox.classList.toggle(O_turn);

  paintAllEmptyCell();
}
//승자를 가리는 함수
function judge(player) {
  let count = [0, 0, 0, 0];
  let notEmpty = 0;

  for (var i = 0; i < 3; i++) {
    count[0] = count[1] = 0;
    for (var j = 0; j < 3; j++) {
      if (tCell[i][j].classList.contains(player)) count[0]++;
      if (tCell[i][j].classList.contains(player)) count[1]++;
      if (tCell[i][j].classList.contains(player) && i === j) count[2]++;
      if (tCell[i][j].classList.contains(player) && i + j === 2) count[3]++;

      if (!isEmpty(tCell[i][j])) notEmpty++;

      if (count.indexOf(3) >= 0) return player;

      if (notEmpty === 9) return "DRAW";
    }
  }
}

//게임 종료를 나타내는 함수
function gameOverMsg(str) {
  let gameover = document.querySelector(".game-over");
  gameover.classList.remove("invisible");

  let msg = document.createElement("div");

  if (str === "DRAW") {
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
