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
  const bindButton = (id, key) => {
    const btn = document.getElementById(id);
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[key] = true;
    }, { passive: false });

    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[key] = false;
    }, { passive: false });
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
