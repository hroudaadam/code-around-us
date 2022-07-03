const { handleSetup, getCanvasSize, handleWindowResized, initialize } = require("../_common");
const GameOfLife = require("./GameOfLife");
const Graph = require("./Graph");

const FPS = 5;   
const GRAPH_SIZE = 30;
const MAX_GENERATIONS = 50;
const MAX_GENERATIONS_NOCHANGE = 10;  

let graph = null;
let gameOfLife = null;

function setup() {
    handleSetup(FPS);
    _restart();
}

function draw() {
    if (gameOfLife.generationsWithoutChange < MAX_GENERATIONS_NOCHANGE && 
        gameOfLife.generation < MAX_GENERATIONS) {
        
        gameOfLife.render();
        gameOfLife.update();
    }
    else {
        gameOfLife.changePreset();
    }
}

function windowResized() {
    handleWindowResized();
    _restart();
}

function mouseClicked() {
    gameOfLife.changePreset();
}

function _restart() {
    background(255); 
    graph = new Graph(GRAPH_SIZE, getCanvasSize());
    gameOfLife = new GameOfLife(graph);
}

initialize(
    setup,
    draw,
    windowResized,
    mouseClicked
);