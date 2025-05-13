let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  addAttributesToExternalLinks();
  showStartScreen();
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function showStartScreen() {
  document.getElementById("overlay-start").classList.remove("dnone");
  if (isMobile()) {
    document.getElementById("mobile-controls").classList.remove("dnone");
  }
}


function startGame() {
  document.getElementById("overlay-start").classList.add("dnone");
  document.getElementById("canvas").classList.remove("dnone");
  loadCanvas();
  setupMobileControls()
}


function loadCanvas() {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  world = new World(canvas, keyboard);
}

function setupMobileControls() {
  document.getElementById("left-btn").addEventListener("touchstart", () => keyboard.LEFT = true);
  document.getElementById("left-btn").addEventListener("touchend", () => keyboard.LEFT = false);

  document.getElementById("right-btn").addEventListener("touchstart", () => keyboard.RIGHT = true);
  document.getElementById("right-btn").addEventListener("touchend", () => keyboard.RIGHT = false);

  document.getElementById("jump-btn").addEventListener("touchstart", () => keyboard.UP = true);
  document.getElementById("jump-btn").addEventListener("touchend", () => keyboard.UP = false);

  document.getElementById("throw-btn").addEventListener("touchstart", () => keyboard.SPACE = true);
  document.getElementById("throw-btn").addEventListener("touchend", () => keyboard.SPACE = false);
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
