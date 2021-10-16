
//Algorithms Imports
import { updateUnvisitedNeighbors } from './dijkstra.js'

// Grid Imports
import { getAllNodes } from '../Grid/gridFunctions.js'

function depthFirstSearch (graph, startNode, endNode) {
    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)

    const visitedNodesInOrder = []

    const stack = []
    stack.push(startNode)

    while (!!stack.length) {
        const currentVertex = stack.pop()   // The vertex on top of the stack is what is being valuated

        if (currentVertex.isWall) {   // If you get to a wall then skip it
            continue;
        }

        if (currentVertex.distance === Infinity) {    // If the distance of the nearest neighbor is infinity something went wrong so the function should return the nodes we have
            return visitedNodesInOrder;
        }

        if (currentVertex === endNode) { // Once the function has reached the endnode, all of the nodes in order of when we visited them will be returned. this is the goal
            return visitedNodesInOrder
        }

        if (currentVertex.visited === false) {   // If the current vertex has not been visited yet, it is marked as visited
            currentVertex.visited = true
            visitedNodesInOrder.push(currentVertex)
        }

        const neighbors = getAllNeighbors(currentVertex, graph) // I then get all of the adjecent neighbors to the current vertex
     

        neighbors.forEach(neighbor => { // If these neighbors are not visited, then they are added to the top of the stack and the function loops again
            if (neighbor.visited === false) {
                stack.push(neighbor)
            }
        })


        updateUnvisitedNeighbors(currentVertex, graph)
    }

    if (!visitedNodesInOrder.includes(endNode)) {   // At the end of the function, if it is impossible to reach the end node, return the nodes we have
        return visitedNodesInOrder
    }
}



function setInitialNodes (nodes, startNode) {   // Sets initial values for the node properties in which the starting node will have a different value for every other node
    nodes.forEach(node => {
        if (node === startNode) {
            node.visited = false;
            node.distance = 0
        } else {
            node.visited = false;
            node.distance = Infinity
        }
        
    })
}


function getAllNeighbors (node, grid) {    // Gets the nearest unvisited neighbor in each direction of the current node
    const neighbors = [];
    const {row, column} = node; // Retrieves the row and column value from the nearest node
    

    if (row > 0) {                               // As long as the above neighbor doesn't go off the grid (off the grid being a row less than 0)
        neighbors.push(grid[row - 1][column]);   // Gets the neighbor directly above the current node (row - 1)
    }

    if (row < grid.length - 1) {                 // As long as the below neighbor doesn't go off the grid (off the grid being larger than the length of the grid). Keep in mind that counting starts at 0 so grid - 1 is actually the length of the grid 
        neighbors.push(grid[row + 1][column]);   // Gets the neighbor directly below the current node (row + 1)
    }

    if (column > 0) {                            // As long as the above neighbor doesn't go off the grid (off the grid being a column less than 0)
        neighbors.push(grid[row][column - 1]);   // Gets the neighbor directly to the left of the current node (column - 1)
    } 

    if (column < grid[0].length - 1) {           // As long as the below neighbor doesn't go off the grid (off the grid being larger than the height of the grid). Keep in mind that counting starts at 0 so grid - 1 is actually the height of the grid 
        neighbors.push(grid[row][column + 1]); 
    } 

    // const result = neighbors.filter(neighbor => !neighbor.visited);
    return neighbors  // Returns neighbors that have not been visited
    // console.log(result);
    // console.log(neighbors)

}




export default depthFirstSearch;
export { setInitialNodes }