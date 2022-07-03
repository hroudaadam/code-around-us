const { handleSetup, handleWindowResized, initialize } = require("../_common.js");
const Atom = require("./Atom");

const FPS = 30;   
let atom = null;

function setup() {
    handleSetup(FPS, true);
    _restart();
}

function draw() {
    background(230); 
    lights();

    atom.update();
}

function windowResized() {
    handleWindowResized();
    _restart();
}

function _restart() {
    frameRate(FPS);
    camera(-40, -100, 370, 0, 0, 0, 0, 1, 0);
    atom = new Atom();
}

initialize(
    setup,
    draw,
    windowResized
);