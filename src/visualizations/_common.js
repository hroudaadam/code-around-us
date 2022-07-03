const MAX_CANVAS_SIZE = 500;
const CANVAS_RESIZE_RATIO = 0.9;

function _calculateCanvasSize() {
    let size = Math.min(windowHeight, windowWidth);
    size = size > MAX_CANVAS_SIZE ? MAX_CANVAS_SIZE : size;
    return size * CANVAS_RESIZE_RATIO;
}

function handleSetup(fps, useGl = false) {
    const canvasSize = _calculateCanvasSize(windowWidth, windowHeight);
    let canvas;

    if (useGl) {
        canvas = createCanvas(canvasSize, canvasSize, WEBGL);
    }
    else {
        canvas = createCanvas(canvasSize, canvasSize);
    }
    canvas.parent("p5-container");
    frameRate(fps);
}

function handleWindowResized() {
    const canvasSize = _calculateCanvasSize(windowWidth, windowHeight);
    resizeCanvas(canvasSize, canvasSize, true);
}

function getCanvasSize() {
    return width;
}

function initialize(setup, draw, windowResized, mouseClicked = null) {
    window.setup = setup;
    window.draw = draw;
    window.windowResized = windowResized;
    if (mouseClicked) window.mouseClicked = mouseClicked;
}

module.exports = {
    handleSetup,
    getCanvasSize,
    handleWindowResized,
    initialize
}