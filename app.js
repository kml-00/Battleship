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

/*---SHIP DATA FUNCTION---*/

const setShipDirection = (shipId, direction) => {
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      ship.direction = direction;
    }
  });
};

const setShipDropPoint = (shipId, drop) => {
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      ship.dropPoint = drop;
    }
  });
};

const getShipPositionOnBoardAll = () => {
  let arr = [];
  ships.forEach((ship) => {
    if (ship.positionOnBoard.length > 0) {
      arr = arr.concat(ship.positionOnBoard);
    }
  });
  return arr;
};

const setShipPositionOnBoard = (shipId, target) => {
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      switch (ship.direction) {
        case "horizontal":
          ship.positionOnBoard = [];
          for (let i = 0; i < ship.size; i++) {
            let tmp = (parseInt(target) + i).toString();

            ship.positionOnBoard.push(tmp);
          }
          break;

        case "vertical":
          ship.positionOnBoard = [];
          for (let i = 0; i < ship.size; i++) {
            let tmp = (parseInt(target) + i * 10).toString();

            ship.positionOnBoard.push(tmp);
          }
          break;
      }
    }
  });
};

const getPositionOnBoard = () => {
  let positionOnBoard = [];
  ships.forEach((ship) => {
    if (ship.positionOnBoard.length > 0) {
    }
  });
};

const setShipBoardState = (shipId, onGameboard) => {
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      ship.onGameboard = onGameboard;
    }
  });
};

const getShipDirection = (shipId) => {
  let direction = null;
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      direction = ship.direction;
    }
  });
  return direction;
};

const getShipBoardState = (shipId) => {
  let onGameboard = null;
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      onGameboard = ship.onGameboard;
    }
  });
  return onGameboard;
};

const getShipDropArea = (shipId) => {
  let dropArea = null;
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      dropArea = ship.dropArea;
    }
  });
  return dropArea;
};

const getShipSize = (shipId) => {
  let size = null;
  ships.forEach((ship) => {
    if (ship.id == shipId) {
      size = ship.size;
    }
  });
  return size;
};

/*---SHIP DATA FUNCTION---*/

/*---DRAG AND DROP---*/
const allowDrop = (event) => {
  event.preventDefault();
};
const dragStart = (event) => {
  event.dataTransfer.setData("text", event.target.id);
  setCurrentElement(event.target.id);
  removeAllListeners();
  addCustomListeners();
  elementPosition();
};
const drop = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  setShipBoardState(currentShip.id, true);
  setShipPositionOnBoard(currentShip.id, event.target.id);
  setShipDropPoint(currentShip.id, event.target.id);
  removeAllListeners();
  addCustomListeners();
  showNextShip();
};

/*---DRAG AND DROP---*/

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
