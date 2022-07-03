const Vertex = require("./Vertex");

class Graph {
    constructor(graphSize, canvasSize, blockedChance) {
        this.graphSize = graphSize;
        this.cellSize = canvasSize / graphSize;
        this.blockedChance = blockedChance;

        this.vertices = this.initializeGraph();
        this.startVertex = this.setRandomStartVertex();
        this.endVertex = this.setRandomEndVertex();
    }

    initializeGraph() {
        let vertices = [];
        for (let y = 0; y < this.graphSize; y++) {
            vertices.push([]);
            for (let x = 0; x < this.graphSize; x++) {
                let vertex = new Vertex(x, y, this.cellSize);
                if (random() < this.blockedChance) {
                    vertex.state = Vertex.states.blocked;
                }
                vertices[y][x] = vertex;
            }
        }
        return vertices;
    }

    setRandomStartVertex() {
        let x, y;    
        do {
            x = int(random(this.graphSize));
            y = int(random(this.graphSize));
        } while (this.vertices[y][x].state === Vertex.states.end);
    
        this.vertices[y][x].state = Vertex.states.start;
        return this.vertices[y][x];
    }

    setRandomEndVertex() {
        let x, y;    
        do {
            x = int(random(this.graphSize));
            y = int(random(this.graphSize));
        } while (this.vertices[y][x].state === Vertex.states.start);
    
        this.vertices[y][x].state = Vertex.states.end;
        return this.vertices[y][x];
    }

    getNeighbours(vertex) {
        let neighbours = [];

        // N
        if (vertex.y > 0)
            neighbours.push(this.vertices[vertex.y - 1][vertex.x]);
    
        // E
        if (vertex.x < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y][vertex.x + 1]);
    
        // S
        if (vertex.y < this.graphSize - 1)
            neighbours.push(this.vertices[vertex.y + 1][vertex.x]);
    
        // W
        if (vertex.x > 0)
            neighbours.push(this.vertices[vertex.y][vertex.x - 1]);

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