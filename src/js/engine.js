const state = {
   score: {
      playerScore: 0,
      computerScore: 0,
      drawScore: 0,
      scoreBoxWin: document.getElementById("score_points_win"),
      scoreBoxLose: document.getElementById("score_points_lose"),
      scoreBoxDraw: document.getElementById("score_points_draw"),
   },
   cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
   },
   fieldCards: {
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
   },
   playerSides: {
      player1: "player-cards",
      player1Box: document.querySelector("#player-cards"),
      computer: "computer-cards",
      computerBox: document.querySelector("#computer-cards"),
   },
   actions: {
      button: document.getElementById("next-duel"),
   },
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

async function getRandomCardId() {
   const randomIndex = Math.floor(Math.random() * cardData.length);
   return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
   const cardImage = document.createElement("img");
   cardImage.setAttribute("height", "100px");
   cardImage.setAttribute("src", `${pathImages}card-back.png`);
   cardImage.setAttribute("data-id", randomIdCard);
   cardImage.classList.add("card");
   if (fieldSide === state.playerSides.player1) {
      cardImage.addEventListener("mouseover", () => {
         drawSelectCard(randomIdCard);
      });

      cardImage.addEventListener("click", () => {
         setCardsField(cardImage.getAttribute("data-id"));
      });
   }

   return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
   for (let i = 0; i < cardNumbers; i++) {
      const randomIdCard = await getRandomCardId();
      const cardImage = await createCardImage(randomIdCard, fieldSide);

      document.getElementById(fieldSide).appendChild(cardImage);
   }
}

async function hiddenCardDetails() {
   state.cardSprites.avatar.src = "";
   state.cardSprites.name.innerText = "";
   state.cardSprites.type.innerText = "";
}

async function showHiddenCardFieldsImages(value) {
   if (value === true) {
      state.fieldCards.player.style.display = "block";
      state.fieldCards.computer.style.display = "block";
   } else {
      state.fieldCards.player.style.display = "none";
      state.fieldCards.computer.style.display = "none";
   }
};

async function drawCardsInField(cardId, computerCardId) {
   state.fieldCards.player.src = cardData[cardId].img;
   state.fieldCards.computer.src = cardData[computerCardId].img;
};

async function setCardsField(cardId) {
   let computerCardId = await getRandomCardId();
   let duelResults = await checkDuelResults(cardId, computerCardId);
   
   await removeAllCardsImages();
   
   await showHiddenCardFieldsImages(true);

   await hiddenCardDetails();

   await drawCardsInField(cardId, computerCardId);

   await updateScore();

   await drawButton(duelResults);
};

async function drawButton(text) {
   state.actions.button.innerText = text.toUpperCase();
   state.actions.button.style.display = "block";
};

async function updateScore() {
   state.score.scoreBoxWin.innerText = state.score.playerScore;
   state.score.scoreBoxLose.innerText = state.score.computerScore;
   state.score.scoreBoxDraw.innerText = state.score.drawScore;
};

async function checkDuelResults(playerCardId, computerCardId) {
   let duelResults = "";
   let playerCard = cardData[playerCardId];

   if (playerCard.WinOf.includes(computerCardId)) {
      duelResults = "win";
      state.score.playerScore++;
   } else if (playerCard.LoseOf.includes(computerCardId)) {
      duelResults = "lose";
      state.score.computerScore++;
   } else {
      duelResults = "draw";
      state.score.drawScore++;
   }
   
   await playAudio(duelResults);
   return duelResults;
};

async function removeAllCardsImages() {
   let { computerBox, player1Box } = state.playerSides;
   let imgElements = computerBox.querySelectorAll("img");
   imgElements.forEach((img) => img.remove());      
   
   imgElements = player1Box.querySelectorAll("img");
   imgElements.forEach((img) => img.remove());      
};

async function drawSelectCard(id) {
   state.cardSprites.avatar.src = cardData[id].img;
   state.cardSprites.name.innerText = cardData[id].name;
   state.cardSprites.type.innerText = "Attribute: " + cardData[id].type;
};

async function resetDuel() {
   state.cardSprites.avatar.src = "";
   state.actions.button.style.display = "none";

   await showHiddenCardFieldsImages(false);

   state.cardSprites.name.innerText = "Selecione";
   state.cardSprites.type.innerText = "uma carta";

   init();
};

async function playAudio(status) {
   const audio = new Audio(`./src/audio/${status}.wav`);

   audio.play();   
};

function init() {
   drawCards(5, state.playerSides.player1);
   drawCards(5, state.playerSides.computer);

   const bgm = document.getElementById("bgm");
   bgm.volume = 0.4;
   bgm.play();
};

init();