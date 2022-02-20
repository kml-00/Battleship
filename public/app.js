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
  console.log("drag");
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
  console.log(data);
  setShipBoardState(currentShip.id, true);
  setShipPositionOnBoard(currentShip.id, event.target.id);
  setShipDropPoint(currentShip.id, event.target.id);
  removeAllListeners();
  addCustomListeners();
  showNextShip();
};

/*---DRAG AND DROP---*/

/* currentship function */
const setCurrentElement = (shipId) => {
  currentShip = document.getElementById(shipId);
};

const showNextShip = () => {
  let avaibleShips = [];
  ships.forEach((ship) => {
    if (ship.onGameboard == false) {
      avaibleShips.push(ship.id);
    }
  });

  if (avaibleShips.length > 0) {
    let element = document.getElementById(avaibleShips[0]);
    element.style.visibility = "visible";
    setCurrentElement(element.id);
  } else {
    let ships = document.querySelector(".ships");
    let rotateIcon = document.querySelector(".rotate-icon");
    let startgame = document.getElementById("startGame");
    ships.style.display = "none";
    rotateIcon.style.display = "none";
    startgame.style.display = "flex";
  }
};

/* currentship function */

/* ship rotate function */
const rotate = () => {
  if (!getShipBoardState(currentShip.id)) {
    if (currentShip.classList.contains("horizontal")) {
      currentShip.classList.remove("horizontal");
      currentShip.classList.add("vertical");
      removeAllListeners();
      setShipDirection(currentShip.id, "vertical");
      addCustomListeners();
    } else {
      currentShip.classList.remove("vertical");
      currentShip.classList.add("horizontal");
      removeAllListeners();
      setShipDirection(currentShip.id, "horizontal");
      addCustomListeners();
    }
  }
};

/* ship rotate function */

/* event listeners function */

const addCustomListeners = () => {
  let ShipDropArea = getShipDropArea(currentShip.id);
  let direction = getShipDirection(currentShip.id);
  let positionOnBoard = getShipPositionOnBoardAll();
  switch (direction) {
    case "horizontal":
      for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game.length - ShipDropArea; j++) {
          let element = document.getElementById(game[i][j]);
          element.style.backgroundColor = "#ABA2EF";
          element.addEventListener("drop", drop);
          element.addEventListener("dragover", allowDrop);
        }
      }

      break;
    case "vertical":
      for (let i = 0; i < game.length - ShipDropArea; i++) {
        for (let j = 0; j < game.length; j++) {
          let element = document.getElementById(game[i][j]);
          element.style.backgroundColor = "#ABA2EF";
          element.addEventListener("drop", drop);
          element.addEventListener("dragover", allowDrop);
        }
      }

      break;
  }
  getPositionOnBoard();
  positionOnBoard.forEach((id) => {
    let element = document.getElementById(id);

    element.style.backgroundColor = "#fff";
    element.removeEventListener("drop", drop);
    element.removeEventListener("dragover", allowDrop);
  });
};
const removeAllListeners = () => {
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      let element = document.getElementById(game[i][j]);
      element.style.backgroundColor = "#fff";
      element.removeEventListener("drop", drop);
      element.removeEventListener("dragover", allowDrop);
    }
  }
};

const elementPosition = () => {
  let element = null;
  ships.forEach((ship) => {
    if (ship.onGameboard) {
      if (ship.id !== currentShip.id) {
        let left = ship.dropPoint % 10;
        let top = Math.floor(ship.dropPoint / 10);
        let position = ship.positionOnBoard;
        let direction = getShipDirection(currentShip.id);

        let dropSize = getShipDropArea(currentShip.id);
        if (direction == "horizontal") {
          for (let i = 1; i < dropSize + 1; i++) {
            position.forEach((point) => {
              let id = parseInt(point) - i;

              element = document.getElementById(id);

              element.style.backgroundColor = "#fff";
              element.removeEventListener("drop", drop);
              element.removeEventListener("dragover", allowDrop);
            });
          }
        }
        if (direction == "vertical") {
          for (let i = 1; i < dropSize + 1; i++) {
            let id = parseInt(ship.dropPoint) - i * 10;
            position.forEach((point) => {
              let id = parseInt(point) - i * 10;

              element = document.getElementById(id);

              element.style.backgroundColor = "#fff";
              element.removeEventListener("drop", drop);
              element.removeEventListener("dragover", allowDrop);
            });
          }
        }
      }
    }
  });
};

const startGame = () => {
  let shipArr = ["ship1", "ship2", "ship3", "ship4"];
  removeAllListeners();
  shipArr.forEach((element) => {
    let ship = document.getElementById(element);
    ship.setAttribute("draggable", false);
    ship.removeEventListener("dragstart", dragStart);
  });

  addClickListener();
};

const addClickListener = () => {
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      let element = document.getElementById(game[i][j]);
      element.style.backgroundColor = "#ABA2EF";
      element.addEventListener("click", click);
    }
  }
};

const removeClickListener = () => {
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      let element = document.getElementById(game[i][j]);
      element.style.backgroundColor = "#fff";
      element.removeEventListener("click", click);
    }
  }
};
/* event listeners function */

/* Game  */

const click = (event) => {
  console.log(event.target.id);

  removeClickListener();
  checkshot(event.target.id);
};

const checkshot = (id) => {
  let ship = ["11", "12", "13", "14"];
  if (ship.includes(id)) {
    console.log("hit");
  } else {
    console.log("dupa");
  }
};
/* Game  */

/* Init function  */
const init = () => {
  let gameheader = document.getElementById("header");
  let gameside = document.getElementById("side");
  let shipArr = ["ship1", "ship2", "ship3", "ship4"];

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
  shipArr.forEach((element) => {
    let ship = document.getElementById(element);

    ship.addEventListener("dragstart", dragStart);
  });
  showNextShip();
};

init();
