const Vertex = require("./Vertex");

class Dijkstra {
    constructor(graph) {
        this.graph = graph;
        
        this.current = this.graph.startVertex;
        this.finished = false;
        this.closedVertices = [];

        this.openedVertices = this.fillOpenedVertices();
        this.graph.startVertex.dist = 0;

        // close start vertex
        this.closeVertex(this.graph.startVertex);
    }

    fillOpenedVertices() {
        let openedVertices = [];
        for (let y = 0; y < this.graph.graphSize; y++) {
            for (let x = 0; x < this.graph.graphSize; x++) {
                let vertex = this.graph.vertices[y][x];
                openedVertices.push(vertex);
            }
        }
        return openedVertices;
    }

    // step of dijkstra
    update() {
        if (this.openedVertices.length > 0) {
            let neighbours = this.graph.getNeighbours(this.current);
            for (let neighbour of neighbours) {
                //  neightbor is still open && neightbor is not blocked
                if ((this.closedVertices.indexOf(neighbour) < 0) && neighbour.state !== Vertex.states.blocked) {
                    let altDist = this.current.dist + 1;
                    // new distance is better then current
                    if (altDist < neighbour.dist) {
                        neighbour.dist = altDist;
                        neighbour.previous = this.current;
                    }
                }
            }

            // select nearest vertex
            let nearestVertex = this.getNearestOpenedVertex();
            if (nearestVertex === this.graph.endVertex || nearestVertex.dist === Number.MAX_SAFE_INTEGER) {
                this.finished = true;
                return;
            }
            nearestVertex.state = Vertex.states.checked;

            // close nearest vertex
            this.closeVertex(nearestVertex);
            // repeat for nearest vertex
            this.current = nearestVertex;
        }
        else {
            this.finished = true;
        }
    }

    getNearestOpenedVertex() {
        let nearestVertex = this.openedVertices[0];
        for (let vertex of this.openedVertices) {
            if (vertex.dist < nearestVertex.dist) {
                nearestVertex = vertex;
            }
        }
        return nearestVertex;
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

module.exports = Dijkstra;