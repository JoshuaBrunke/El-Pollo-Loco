let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

function init() {
  setupLinks();
  setupSound();
  setupMuteButton();
  showStartScreen();
}

function setupLinks() {
  addAttributesToExternalLinks();
}

function setupSound() {
  loadMuteState();
  updateMuteButton();
  AudioHub.muteAll(isMuted);
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function showStartScreen() {
  document.getElementById("overlay-start").classList.remove("dnone");

  if (isMobileDevice()) {
    document.getElementById("mobile-controls").classList.remove("dnone");
  }
}

function startGame() {
  document.getElementById("overlay-start").classList.add("dnone");
  document.getElementById("canvas").classList.remove("dnone");
  loadCanvas();
  setupMobileControls();
  playBGM();
}

function exitGame() {
  location.reload();
}

function loadCanvas() {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  world = new World(canvas, keyboard);
}

function setupMobileControls() {
  const bindButton = (id, key) => {
    const btn = document.getElementById(id);
    btn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        keyboard[key] = true;
      },
      { passive: false }
    );

    btn.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        keyboard[key] = false;
      },
      { passive: false }
    );
  };

  bindButton("left-btn", "LEFT");
  bindButton("right-btn", "RIGHT");
  bindButton("jump-btn", "UP");
  bindButton("throw-btn", "SPACE");
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
    case "Enter":
      keyboard.ENTER = true;
      break;
    case "Escape":
      keyboard.ESCAPE = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
    case "Enter":
      keyboard.ENTER = false;
      break;
    case "Escape":
      keyboard.ESCAPE = false;
      break;
  }
});

function restartGame() {
  hideOverlays();
  resetWorld();
  const level = createFreshLevel();
  startNewWorld(level);
}

function hideOverlays() {
  document.getElementById("overlay-gameover").classList.add("dnone");
  document.getElementById("overlay-victory").classList.add("dnone");
  document.getElementById("canvas").classList.remove("dnone");

  if (isMobileDevice()) {
    document.getElementById("mobile-controls").classList.remove("dnone");
  }
}

function resetWorld() {
  if (world && typeof world.stop === "function") {
    world.stop();
  }
  world = null;
}

function createFreshLevel() {
  const freshEnemies = [
    new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
    new MutantChicken(), new MutantChicken(), new MutantChicken(), new MutantChicken(),
    new Endboss()
  ];
  const freshBottles = bottlePositions.map((x) => new Bottle(x, bottleGroundY));
  const freshCoins = coinPositions.map(([x, y]) => new Coin(x, y));
  const freshBackground = level1.backgroundObjects.filter((obj) => obj instanceof BackgroundObject);
  return new Level(freshEnemies, [new Cloud()], [...freshBackground, ...freshBottles, ...freshCoins]);
}

function startNewWorld(level) {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  ctx = canvas.getContext("2d");

  world = new World(canvas, keyboard);
  world.level = level;
  world.setWorld();
  setupMobileControls();
  playBGM();
}

function loadMuteState() {
  const savedMute = localStorage.getItem("isMuted");
  if (savedMute !== null) {
    isMuted = JSON.parse(savedMute);
  }
}

function saveMuteState() {
  localStorage.setItem("isMuted", JSON.stringify(isMuted));
}

function updateMuteButton() {
  const muteBtn = document.getElementById("mute-button");
  muteBtn.textContent = isMuted ? "Unmute" : "Mute";
}

function toggleMute() {
  isMuted = !isMuted;
  saveMuteState();
  updateMuteButton();
  AudioHub.muteAll(isMuted);
}

function setupMuteButton() {
  document.getElementById("mute-button").addEventListener("click", toggleMute);
}
