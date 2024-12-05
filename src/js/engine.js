const state = {
   score: {
      playerScore: 0,
      computerScore: 0,
      scoreBox: document.getElementById("core_points"),
   },
   cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
   },
   fieldCards: {
      player: document.getElementById("player-field-card")
      computer: document.getElementById("computer-field-card")
   },
   button: document.getElementById("next-duel"),
};

const pathImages = "./src/icons/"

const cardData = [
   {
      id: 0,
      name: "Blue Eyes Ehite Dragon",
      type: "Paper",
      img: `${pathImages}dragon.png`,
      WinOf: [1],
      LoseOf: [2],
   },
   {
      id: 1,
      name: "Dark Magician",
      type: "Rock",
      img: `${pathImages}magician.png`,
      WinOf: [2],
      LoseOf: [0],
   },
   {
      id: 2,
      name: "Exodia",
      type: "Scissors",
      img: `${pathImages}exodia.png`,
      WinOf: [0],
      LoseOf: [1],
   },
]

// const players = {
//    player1: "player-cards"
// }

function init() {};

init();