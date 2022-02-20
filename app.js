let gameboard = document.getElementById("game");
let game = Array.from(Array(10), () => new Array(10));
let currentShip = null;
let positionOnBoard = [];

/*SHIPS Array */
ships = [
  {
    id: "ship1",
    direction: "horizontal",
    size: 1,
    dropArea: 0,
    dropPoint: null,
    positionOnBoard: [],
    onGameboard: false,
  },
  {
    id: "ship2",
    direction: "horizontal",
    size: 2,
    dropArea: 1,
    dropPoint: null,
    positionOnBoard: [],
    onGameboard: false,
  },
  {
    id: "ship3",
    direction: "horizontal",
    size: 3,
    dropArea: 2,
    dropPoint: null,
    positionOnBoard: [],
    onGameboard: false,
  },
  {
    id: "ship4",
    direction: "horizontal",
    size: 4,
    dropArea: 3,
    dropPoint: null,
    positionOnBoard: [],
    onGameboard: false,
  },
];

/*SHIPS Array */

/* Init function  */
const init = () => {
  let gameheader = document.getElementById("header");
  let gameside = document.getElementById("side");

  let header = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 0; i < 10; i++) {
    let itemheader = document.createElement("div");
    let itemside = document.createElement("div");

    itemheader.classList.add("item-header");
    itemheader.innerHTML = header[i];
    gameheader.appendChild(itemheader);

    itemside.classList.add("item-side");
    itemside.innerHTML = i + 1;
    gameside.appendChild(itemside);
  }

  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      i == 0 ? (game[i][j] = j) : (game[i][j] = i + "" + j);
      let div = document.createElement("div");
      div.classList.add("item");

      div.id = game[i][j];

      gameboard.appendChild(div);
    }
  }
  let button = document.getElementById("rotate");
  button.addEventListener("click", rotate);
  showNextShip();
};
/* Init function  */

init();
