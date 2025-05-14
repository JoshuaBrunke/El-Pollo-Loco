let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
const KEY_RIGHT = "ArrowRight";
const KEY_LEFT = "ArrowLeft";
const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_SPACE = " ";
const KEY_ENTER = "Enter";
const KEY_ESCAPE = "Escape";

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

function setupCanvas() {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
}

function loadCanvas() {
  setupCanvas();
  world = new World(canvas, keyboard);
}

function setupMobileControls() {
  bindMobileButton("left-btn", "LEFT");
  bindMobileButton("right-btn", "RIGHT");
  bindMobileButton("jump-btn", "UP");
  bindMobileButton("throw-btn", "SPACE");
}

function bindMobileButton(buttonId, keyName) {
  const button = document.getElementById(buttonId);

  button.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard[keyName] = true;
  }, { passive: false });

  button.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard[keyName] = false;
  }, { passive: false });
}

function handleKeyChange(event, isPressed) {
  switch (event.key) {
    case KEY_RIGHT: keyboard.RIGHT = isPressed; break;
    case KEY_LEFT: keyboard.LEFT = isPressed; break;
    case KEY_UP: keyboard.UP = isPressed; break;
    case KEY_DOWN: keyboard.DOWN = isPressed; break;
    case KEY_SPACE: keyboard.SPACE = isPressed; break;
    case KEY_ENTER: keyboard.ENTER = isPressed; break;
    case KEY_ESCAPE: keyboard.ESCAPE = isPressed; break;
  }
}

window.addEventListener("keydown", (e) => handleKeyChange(e, true));
window.addEventListener("keyup", (e) => handleKeyChange(e, false));

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
  setupCanvas();
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
