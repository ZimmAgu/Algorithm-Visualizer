// These are the animations for specific algorithms such as dijkstra, BFS, DFS, etc.

// Algorithms Imports
import dijkstra, {getShortestPath} from '../Algorithms/dijkstra.js';
import depthFirstSearch from '../Algorithms/depthFirstSearch.js';

// Animations Imports
import { ANIMATION_SPEED, animateShortestPath, animateNeighborVisitation } from './universalAnimations.js';

// Grid Imports
import { getAllNodes } from  '../Grid/gridFunctions.js'

// Pathfinder Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions'



function visualizeDijkstra (grid) { // Retrieves both the shortest nodes in order and the shortes posssible node
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

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    const shortestPath = getShortestPath(endNode);

    animateDijkstra(visitedNodesInOrder, shortestPath)

    return visitedNodesInOrder  // I return the visited nodes in order because I need to use it in other components as well
}



function animateDijkstra (visitedNodesInOrder, shortestPath) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() =>{
                animateShortestPath(shortestPath); 
            }, ANIMATION_SPEED * i)
        }
    }
    

    animateNeighborVisitation(visitedNodesInOrder);
}


function visualizeDFS (grid) {
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

    depthFirstSearch(grid, startNode, endNode)
}


export { visualizeDijkstra, visualizeDFS };