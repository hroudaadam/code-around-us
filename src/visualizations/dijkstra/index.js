const { handleSetup, getCanvasSize, handleWindowResized, initialize } = require("../_common.js");
const Dijkstra = require("./Dijkstra");
const Graph = require("./Graph");

const FPS = 15;   
const GRAPH_SIZE = 15;
const BLOCKED_CHANCE = 0.3;
const DELAY = 1.5;    

let graph = null;
let dijkstra = null;

function setup() {
    handleSetup(FPS);            
    _restart();
}

function draw() {
    dijkstra.update();
    graph.render();

    if (dijkstra.finished) {
        dijkstra.renderResult();
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
    dijkstra = new Dijkstra(graph);
    graph.render();
}

initialize(
    setup,
    draw,
    windowResized
);