
//Algorithms Imports
import { sortNodesByDistance, getUnvisitedNeighbors, updateUnvisitedNeighbors } from './dijkstra.js'

// Grid Imports
import { getAllNodes } from '../Grid/gridFunctions.js'

function depthFirstSearch (graph, startNode, endNode) {
    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)

    const stack = []
    stack.push(startNode)

    const visitedNodesInOrder = []

    while (!!stack.length) {
        const currentVertex = stack.pop()


        if (currentVertex == endNode) {
            console.log(visitedNodesInOrder)
            return visitedNodesInOrder
        }

        if (currentVertex.visited == false) {
            currentVertex.visited = true
            visitedNodesInOrder.push(currentVertex)
        }

        const neighbors = getAllNeighbors(currentVertex, graph)

        neighbors.forEach(neighbor => {
            if (neighbor.visited == false) {
                stack.push(neighbor)
            }
        })
    }
}



function setInitialNodes (nodes, startNode) {   // Sets initial values for the node properties in which the starting node will have a different value for every other node
    nodes.forEach(node => {
        node.visited = false;
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