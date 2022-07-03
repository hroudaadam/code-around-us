class Vertex {
    static states = {
        empty: 0,
        blocked: 1,
        start: 2,
        end: 3,
        checked: 4
    }

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.state = Vertex.states.empty;

        // current distance to this vertex from the start
        this.dist = Number.MAX_SAFE_INTEGER;
        this.previous = null;
    }

    render(fillColor = null) {
        if (!fillColor) {
            switch (this.state) {
                case Vertex.states.start:
                    fillColor = color(42, 237, 53);
                    break;
                case Vertex.states.end:
                    fillColor = color(230, 57, 70);
                    break;
                case Vertex.states.checked:
                    fillColor = color(12, 182, 238);
                    break;
                case Vertex.states.empty:
                    fillColor = color(255, 255, 255);
                    break;
                case Vertex.states.blocked:
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