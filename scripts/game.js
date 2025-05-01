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
    world = new World(canvas);

console.log("My character is", world.character);


}

window.addEventListener("keypress", (e) => {

});