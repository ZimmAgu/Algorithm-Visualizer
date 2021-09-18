// These are the animations for specific algorithms such as dijkstra, BFS, DFS, etc.

// Algorithms Imports
import dijkstra, {getShortestPath} from '../Algorithms/dijkstra.js';

// Animations Imports
import { ANIMATION_SPEED, animateShortestPath, animateNeighborVisitation } from './universalAnimations.js';

// Grid Imports
import { getAllNodes } from  '../Grid/gridFunctions.js'

// Pathfinder Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions'



function visualizeDijkstra (grid) { // Retrieves both the shortest nodes in order and the shortes posssible node
    const nodes = getAllNodes(grid);

    let startNode = grid[START_NODE_ROW][START_NODE_COLUMN];

    nodes.forEach(node => {
        if (node.isStart) {
            startNode = grid[node.row][node.column]
        }
    })

    
    

    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    const shortestPath = getShortestPath(endNode);

    animateDijkstra(visitedNodesInOrder, shortestPath)
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




export { visualizeDijkstra };