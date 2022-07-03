const { handleSetup, getCanvasSize, handleWindowResized, initialize } = require("../_common.js");
const Astar = require("./Astar");
const Graph = require("./Graph");

const FPS = 15;
const GRAPH_SIZE = 15;
const BLOCKED_CHANCE = 0.3;
const DELAY = 1.5;  

let graph = null;
let astar = null;

function setup() {
    handleSetup(FPS);
    _restart();
}

function draw() {
    astar.update();
    graph.render();

    if (astar.finished) {
        astar.renderResult();
        noLoop();

        setTimeout(() => {
            _restart();
            loop();
        }, DELAY * 1000);
    }
}

function windowResized() {
    handleWindowResized();
    _restart();
}

function _restart() {
    background(255); 
    graph = new Graph(GRAPH_SIZE, getCanvasSize(), BLOCKED_CHANCE);
    astar = new Astar(graph);
    graph.render();
}

initialize(
    setup,
    draw,
    windowResized
);