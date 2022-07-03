const Vertex = require("./Vertex");

class GameOfLife {
    constructor(graph) {    
        this.graph = graph;

        this.generation = 0;
        this.changeInGeneration = false;
        this.generationsWithoutChange = 0;        

        this.currentPreset = -1;
        this.changePreset();
    }

    update() {
        this.changeInGeneration = false;
        for (let y = 0; y < this.graph.graphSize; y++) {
            for (let x = 0; x < this.graph.graphSize; x++) {
                const current = this.graph.vertices[y][x];
                const currentAlive = current.state === Vertex.states.alive;
                const aliveNeighbours = this.countOfAliveNeighbours(current);

                if (currentAlive && (aliveNeighbours < 2))
                    current.newState = Vertex.states.empty;
                else if (currentAlive && (aliveNeighbours > 3))
                    current.newState = Vertex.states.empty;
                else if (!currentAlive && (aliveNeighbours == 3))
                    current.newState = Vertex.states.alive;
            }
        }

        for (let y = 0; y < this.graph.graphSize; y++) {
            for (let x = 0; x < this.graph.graphSize; x++) {
                let hasChanged = this.graph.vertices[y][x].persistState();
                if (hasChanged) this.changeInGeneration = true;
            }
        }

        if (!this.changeInGeneration) this.generationsWithoutChange++;
        this.generation++;
    }

    countOfAliveNeighbours(vertex) {
        let neighbours = this.graph.getNeighbours(vertex);
        let countOfAlives = 0;
        for (let neighbour of neighbours) {
            if (neighbour.state == Vertex.states.alive) countOfAlives++;
        }
        return countOfAlives;
    }

    render() {
        this.graph.render();
    }

    reset() {
        this.graph.clear();
        this.generationsWithoutChange = 0;
        this.generation = 0;
    }

    changePreset() {
        this.currentPreset++;
        if (this.currentPreset >= this.presets.length) this.currentPreset = 0;
        
        this.applyPreset(this.presets[this.currentPreset]);
    }

    applyPreset(preset) {
        this.reset();

        for (let vertex of preset) {
            let x = vertex.x;
            let y = vertex.y;
            if (x >= 0 && x < this.graph.graphSize &&
                    y >= 0 && y < this.graph.graphSize) {
                this.graph.vertices[y][x].state = Vertex.states.alive;
            }
            else {
                console.error("Preset out of bounds");
                return;
            }
        }
    }

    presets = [
        // combination
        [
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 2},

            {x: 7, y: 6},
            {x: 8, y: 7},
            {x: 6, y: 8},
            {x: 7, y: 8},
            {x: 8, y: 8},

            {x: 13, y: 12},
            {x: 14, y: 13},
            {x: 12, y: 14},
            {x: 13, y: 14},
            {x: 14, y: 14},

            {x: 21, y: 2},
            {x: 21, y: 3},
            {x: 21, y: 4},

            {x: 7, y: 21},
            {x: 8, y: 21},
            {x: 9, y: 21},
            {x: 6, y: 22},
            {x: 7, y: 22},
            {x: 8, y: 22},

            {x: 24, y: 16},
            {x: 25, y: 16},
            {x: 26, y: 16},
            {x: 23, y: 17},
            {x: 24, y: 17},
            {x: 25, y: 17},

            {x: 16, y: 24},
            {x: 16, y: 25},
            {x: 17, y: 24},
            {x: 17, y: 25},
            {x: 18, y: 26},
            {x: 18, y: 27},
            {x: 19, y: 26},
            {x: 19, y: 27}
        ],
        // glider
        [
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 2}
        ],
        //blinker
        [
            {x: 2, y: 1},
            {x: 2, y: 2},
            {x: 2, y: 3},
        ],
        // block
        [
            {x: 2, y: 2},
            {x: 3, y: 2},
            {x: 2, y: 3},
            {x: 3, y: 3},
        ],
        // toad
        [
            {x: 3, y: 2},
            {x: 4, y: 2},
            {x: 5, y: 2},
            {x: 2, y: 3},
            {x: 3, y: 3},
            {x: 4, y: 3}
        ],
        // beacon
        [
            {x: 2, y: 2},
            {x: 2, y: 3},
            {x: 3, y: 2},
            {x: 3, y: 3},
            {x: 4, y: 4},
            {x: 4, y: 5},
            {x: 5, y: 4},
            {x: 5, y: 5}
        ]
    ]
}

module.exports = GameOfLife;