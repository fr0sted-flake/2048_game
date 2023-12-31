var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  startGame();
};

function startGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  //   board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [4, 4, 8, 8],
  //     [4, 4, 8, 8],
  //   ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let number = board[r][c];
      updateTile(tile, number);
      document.getElementById("board").append(tile);
    }
  }

  addTwoToStartGame();
  addTwoToStartGame();
}

function updateTile(tile, number) {
  tile.innerText = "";
  tile.classList.value = ""; // to clear the class name values
  tile.classList.add("tile");
  if (number > 0) {
    tile.innerText = number;
    if (number <= 4096) {
      tile.classList.add("x" + number.toString());
    } else {
      tile.classList.add("x8192"); // styles all the tiles from and after 8192 according to class x8192
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    addTwoToStartGame();
  } else if (e.code == "ArrowRight") {
    slideRight();
    addTwoToStartGame();
  } else if (e.code == "ArrowUp") {
    slideUp();
    addTwoToStartGame();
  } else if (e.code == "ArrowDown") {
    slideDown();
    addTwoToStartGame();
  }
  document.getElementById("score").innerText = score;
});

function slide(row) {
  row = filterZero(row); //to filter the 0 in the row array

  for (let i = 0; i < row.length - 1; i++) {
    //it applies the logic of doubling the number in the tile
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row); // again filter the middle zeroes in the array

  while (row.length < columns) {
    // as long as its length is not equal to 4 it keeps on adding 0
    row.push(0);
  }
  return row;
}

function filterZero(row) {
  return row.filter((number) => number != 0);
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    board[r] = row.reverse();
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let number = board[r][c];
      updateTile(tile, number);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function addTwoToStartGame() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    //find random row and column to place a 2 in
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        //at least one zero in the board
        return true;
      }
    }
  }
  return false;
}
