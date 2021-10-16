// These are the animations for specific algorithms such as dijkstra, BFS, DFS, etc.

// Algorithms Imports
import { getShortestPath } from '../Algorithms/dijkstra.js';

// Animations Imports
import { animateAlgorithm } from './universalAnimations.js';

// Grid Imports
import { getAllNodes } from  '../Grid/gridFunctions.js'

// Pathfinder Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions'



function visualizeAlgorithm (grid, algorithm) { // Retrieves both the shortest nodes in order and the shortes posssible node
    const nodes = getAllNodes(grid);

    let startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    let endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    nodes.forEach(node => { // Defines the start and end node variables that will be passed into the dijkstra function 
        if (node.isStart) {
            startNode = grid[node.row][node.column]
        }

        if (node.isEnd) {
            endNode = grid[node.row][node.column]
        }
    })

    const visitedNodesInOrder = algorithm(grid, startNode, endNode)
    const shortestPath = getShortestPath(endNode);

    animateAlgorithm(visitedNodesInOrder, shortestPath)

    return [visitedNodesInOrder.length, shortestPath.length]  // I need the visited node length and the shortest path length of each algorithm to se the state in another component
}



export { visualizeAlgorithm };