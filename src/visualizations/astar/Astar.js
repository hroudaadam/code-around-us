const Vertex = require("./Vertex");

class Astar {
    constructor(graph) {
        this.graph = graph;
        
        this.finished = false;
        this.openedVertices = [];
        this.closedVertices = [];
        
        this.current = this.graph.startVertex;
        this.current.h = this.heuristic(this.current, this.graph.endVertex);
        this.current.g = 0;
        this.openedVertices.push(this.current);
    }

    update() {
        if (this.openedVertices.length > 0) {
            this.current = this.getBestOpenVertex();

            if (this.current === this.graph.endVertex) {
                this.finished = true;
                return;
            }
            
            if (this.current !== this.graph.startVertex) 
                this.current.state = Vertex.states.checked;
            
            this.closeVertex(this.current);

            let currG = this.current.g + 1;
            let neighbours = this.graph.getNeighbours(this.current);
            for (let neighbour of neighbours) {
                
                if ((this.closedVertices.indexOf(neighbour) > -1) || 
                     neighbour.state === Vertex.states.blocked) continue;

                let currIsBetter;
                if (this.openedVertices.indexOf(neighbour) < 0) {
                    this.openedVertices.push(neighbour);
                    currIsBetter = true;
                }
                else {
                    currIsBetter = currG < neighbour.g;
                }

                if (currIsBetter) {
                    neighbour.previous = this.current;
                    neighbour.g = currG;
                    neighbour.h = this.heuristic(neighbour, this.graph.endVertex);
                }
            }
        }
        else {
            this.finished = true;
        }
    }

    heuristic(from, to) {
        let a = abs(from.x - to.x);
        let b = abs(from.y - to.y);
        let c = sqrt(pow(a, 2) + pow(b, 2));
        return c;
    }

    getBestOpenVertex() {
        let best = this.openedVertices[0];
        for (let vertex of this.openedVertices) {
            if (vertex.f() < best.f()) {
                best = vertex;
            }
        }
        return best;
    }
    
    closeVertex(vertex) {
        this.closedVertices.push(vertex);
        let index = this.openedVertices.indexOf(vertex);
        this.openedVertices.splice(index, 1);
    }

    renderResult() {
        let prev = this.graph.endVertex.previous;
        while (prev && prev.previous) {
            prev.render(color(234, 239, 50));
            prev = prev.previous;
        }
    }
}

module.exports = Astar;