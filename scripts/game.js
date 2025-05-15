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

/**
 * Initialises the game by setting up external links, sound settings and the mute button 
 * and showing the start screen overlay.
 */
function init() {
  setupLinks();
  setupSound();
  setupMuteButton();
  showStartScreen();
}

/**
 * Helper function; adds properties to external links on the website.
 */
function setupLinks() {
  addAttributesToExternalLinks();
}

/**
 * Sets up the sound.
 */
function setupSound() {
  loadMuteState();
  updateMuteButton();
  AudioHub.muteAll(isMuted);
}

/**
 * Detects if the user is on a mobile device.
 * @returns {boolean} True if the user is on a mobile device, false otherwise.
 */
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/** 
 * Shows the start screen overlay.
 * If the user is on a mobile device, it also shows the mobile controls.
 */
function showStartScreen() {
  document.getElementById("overlay-start").classList.remove("dnone");

  if (isMobileDevice()) {
    document.getElementById("mobile-controls").classList.remove("dnone");
  }
}

/**
 * Hides the start screen overlay and shows the game canvas.
 * Sets up the game world and mobile controls.
 * Plays the background music.
 * This function is called when the user clicks the start button.
 */
function startGame() {
  document.getElementById("overlay-start").classList.add("dnone");
  document.getElementById("canvas").classList.remove("dnone");
  loadCanvas();
  setupMobileControls();
  playBGM();
}

/**
 * Exits the game by reloading the page.
 * This function is called when the user clicks the exit button.
 */
function exitGame() {
  location.reload();
}

/**
 * Sets up the canvas element for the game with width and height in 2D.
 */
function setupCanvas() {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
}

/**
 * Loads the canvas and initializes the game world.
 */
function loadCanvas() {
  setupCanvas();
  world = new World(canvas, keyboard);
}

/**
 * Sets up the mobile controls for the game.
 * Binds touch events to the buttons for left, right, jump, and throw actions.
 */
function setupMobileControls() {
  bindMobileButton("left-btn", "LEFT");
  bindMobileButton("right-btn", "RIGHT");
  bindMobileButton("jump-btn", "UP");
  bindMobileButton("throw-btn", "SPACE");
}

/**
 * Binds touch events to a mobile control button for input simulation.
 * @param {string} buttonId - The ID of the button element (e.g. "left-btn").
 * @param {string} keyName - The name of the keyboard input to simulate (e.g. '"LEFT", "SPACE").
 */
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

/**
 * Updates the keyboard state when a key is pressed or released.
 * 
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {boolean} isPressed - Whether the key is being pressed (true) or released (false).
 */
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

/**
 * Restarts the game by resetting the world and starting with a fresh level.
 * Hides the game over and victory overlays.
 */
function restartGame() {
  hideOverlays();
  resetWorld();
  const level = createFreshLevel();
  startNewWorld(level);
}

/**
 * Hides the game over and victory overlays.
 * Shows the game canvas and, if on a mobile device, the mobile controls.
 */
function hideOverlays() {
  document.getElementById("overlay-gameover").classList.add("dnone");
  document.getElementById("overlay-victory").classList.add("dnone");
  document.getElementById("canvas").classList.remove("dnone");

  if (isMobileDevice()) {
    document.getElementById("mobile-controls").classList.remove("dnone");
  }
}

/**
 * Resets the world by stopping any ongoing sounds and clearing the world object.
 * If the world has a stop method, it calls that method to stop the world.
 */
function resetWorld() {
  stopDefeatSound();
  if (world && typeof world.stop === "function") {
    world.stop();
  }
  world = null;
}

/**
 * Creates a fresh level for a restart.
 * @returns {Level} - A new Level object with fresh enemies, bottles, coins, and background objects.
 */
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

/**
 * Starts a new game world with the provided level.
 * 
 * @param {Level} level - The level object containing enemies, clouds, and background elements.
 */
function startNewWorld(level) {
  setupCanvas();
  world = new World(canvas, keyboard);
  world.level = level;
  world.setWorld();
  world.gameEnded = false;
  setupMobileControls();
  playBGM();
}

/**
 * Loads the saved mute state from local storage.
 */
function loadMuteState() {
  const savedMute = localStorage.getItem("isMuted");
  if (savedMute !== null) {
    isMuted = JSON.parse(savedMute);
  }
}

/**
 * Saves the current mute state to local storage.
 */
function saveMuteState() {
  localStorage.setItem("isMuted", JSON.stringify(isMuted));
}

/**
 * Updates the mute button text based on the current mute state.
 * If muted, it shows "Unmute", otherwise it shows "Mute".
 */
function updateMuteButton() {
  const muteBtn = document.getElementById("mute-button");
  muteBtn.textContent = isMuted ? "Unmute" : "Mute";
}

/**
 * Toggles the mute state of the game.
 * If the game is currently muted, it unmutes it and vice versa.
 */
function toggleMute() {
  isMuted = !isMuted;
  saveMuteState();
  updateMuteButton();
  AudioHub.muteAll(isMuted);
}

/**
 * Sets up the mute button to toggle the mute state when clicked.
 */
function setupMuteButton() {
  document.getElementById("mute-button").addEventListener("click", toggleMute);
}
