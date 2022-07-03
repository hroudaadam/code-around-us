class Vertex {
    static states = {
        empty: 0,
        alive: 1
    }

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.state = Vertex.states.empty;
        this.newState = null;
    }

    persistState() {
        if (this.newState != null) {
            this.state = this.newState;
            this.newState = null;
            return true;
        }
        return false;
    }
 
    render(fillColor = null) {
        if (!fillColor) {
            switch (this.state) {
                case Vertex.states.empty:
                    fillColor = color(255, 255, 255);
                    break;
                case Vertex.states.alive:
                    fillColor = color(91, 93, 94);
                    break;
            }
        }
        fill(fillColor);
        strokeWeight(0.2);
        rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}

module.exports = Vertex;