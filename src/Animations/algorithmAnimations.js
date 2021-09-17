// These are the animations for specific algorithms such as dijkstra, BFS, DFS, etc.

// Algorithms Imports
import dijkstra, {getShortestPath} from '../Algorithms/dijkstra.js';

// Animations Imports
import { animateShortestPath, animateNeighborVisitation } from './universalAnimations.js';



const START_NODE_ROW = 5;
const START_NODE_COLUMN = 5;

const END_NODE_ROW = 5;
const END_NODE_COLUMN = 20;


function visualizeDijkstra (grid) {
    const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
    const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    const shortestPath = getShortestPath(endNode);

    animateDijkstra(visitedNodesInOrder, shortestPath)
}



function animateDijkstra (visitedNodesInOrder, shortestPath) {

    const ANIMATION_SPEED = 50;
    
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