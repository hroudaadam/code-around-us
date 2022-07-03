const Vertex = require("./Vertex");

class Graph {
    constructor(graphSize, canvasSize) {
        this.graphSize = graphSize;
        this.cellSize = canvasSize / graphSize;

        this.vertices = this.initializeGraph();
    }

    initializeGraph() {
        let vertices = [];
        for (let y = 0; y < this.graphSize; y++) {
            vertices.push([]);
            for (let x = 0; x < this.graphSize; x++) {
                let vertex = new Vertex(x, y, this.cellSize);
                vertices[y][x] = vertex;
            }
        }
        return vertices;
    }

    clear() {
        for (let y = 0; y < this.graphSize; y++) {
            for (let x = 0; x < this.graphSize; x++) {
                this.vertices[y][x].state = Vertex.states.empty;
            }
        }
    }

    getNeighbours(vertex) {
        let neighbours = [];

        // N
        if (vertex.y > 0)
            neighbours.push(this.vertices[vertex.y - 1][vertex.x]);

        // NE
        if (vertex.y > 0 && vertex.x < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y - 1][vertex.x + 1]);
    
        // E
        if (vertex.x < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y][vertex.x + 1]);

        // SE
        if (vertex.x < this.graphSize - 1 && vertex.y < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y + 1][vertex.x + 1]);
    
        // S
        if (vertex.y < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y + 1][vertex.x]);

        // SW
        if (vertex.y < this.graphSize - 1 && vertex.x > 0)
            neighbours.push(this.vertices[vertex.y + 1][vertex.x - 1]);
    
        // W
        if (vertex.x > 0)
            neighbours.push(this.vertices[vertex.y][vertex.x - 1]);

        // NW
        if (vertex.y > 0 && vertex.x > 0)
            neighbours.push(this.vertices[vertex.y - 1][vertex.x - 1]);

        return neighbours;
    }

    render() {
        for (let y = 0; y < this.graphSize; y++) {
            for (let x = 0; x < this.graphSize; x++) {
                this.vertices[y][x].render();
            }
        }
    }
}

module.exports = Graph;