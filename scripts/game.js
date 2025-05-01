let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    addAttributesToExternalLinks();
    loadCanvas();
}

function loadCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = 720;
    canvas.height = 480;
    ctx = canvas.getContext("2d");
    world = new World(canvas, keyboard);

console.log("My character is", world.character);


}

window.addEventListener("keydown", (e) => {
if (e.keyCode == 39) {
    keyboard.RIGHT = true;
} else if (e.keyCode == 37) {
    keyboard.LEFT = true;
} else if (e.keyCode == 38) {
    keyboard.UP = true;
} else if (e.keyCode == 40) {
    keyboard.DOWN = true;
} else if (e.keyCode == 32) {
    keyboard.SPACE = true;
} else if (e.keyCode == 13) {
    keyboard.ENTER = true;
} else if (e.keyCode == 27) {
    keyboard.ESCAPE = true;
}
});

window.addEventListener("keyup", (e) => {
if (e.keyCode == 39) {
    keyboard.RIGHT = false;
} else if (e.keyCode == 37) {
    keyboard.LEFT = false;
} else if (e.keyCode == 38) {
    keyboard.UP = false;
} else if (e.keyCode == 40) {
    keyboard.DOWN = false;
} else if (e.keyCode == 32) {
    keyboard.SPACE = false;
} else if (e.keyCode == 13) {
    keyboard.ENTER = false;
} else if (e.keyCode == 27) {
    keyboard.ESCAPE = false;
}
});
