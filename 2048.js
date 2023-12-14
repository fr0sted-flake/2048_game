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

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let number = board[r][c];
      updateTile(tile, number);
      document.getElementById("board").append(tile);   }
  }
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
      tile.classList.add("x8192");     // styles all the tiles from and after 8192 according to class x8192
    }
  }
}
