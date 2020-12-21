const score0El = document.querySelector("#score-0");
const score1El = document.querySelector("#score-1");
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const btnNew = document.querySelector(".btn-newgame");
const btnroll = document.querySelector(".btn-rolldice");
const btnhold = document.querySelector(".btn-hold");
const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
let scores, activeplayer, currentscore, playing;

const init = function () {
  scores = [0, 0];
  activeplayer = 0;
  currentscore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hiden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player-0");
  player1El.classList.remove("player-0");
};
init();

const switchplayer = function () {
  document.getElementById(`current-${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-0");
  player1El.classList.toggle("player-0");
};
const showElement = function () {
  modal.classList.remove("hiden1");
  overlay.classList.remove("hiden1");
};
const closemodal = function () {
  modal.classList.add("hiden1");
  overlay.classList.add("hiden1");
};

btnroll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove("hiden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(
        `current-${activeplayer}`
      ).textContent = currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  scores[activeplayer] += currentscore;
  document.getElementById(`score-${activeplayer}`).textContent =
    scores[activeplayer];

  if (scores[activeplayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player-${activeplayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player-${activeplayer}`)
      .classList.remove("player-0");
    diceEl.classList.add("hiden");
  } else {
    switchplayer();
  }
});
btnNew.addEventListener("click", init);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    init();
  }
});
document.querySelector(".btn-rule").addEventListener("click", showElement);
overlay.addEventListener("click", closemodal);
