
//Algorithms Imports
import { setInitialNodes } from './depthFirstSearch';
import { updateUnvisitedNeighbors } from './dijkstra.js'

// Grid Imports
import { getAllNodes } from '../Grid/gridFunctions.js'

function breadthFirstSearch (graph, startNode, endNode) {
    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)

    const queue = []
    queue.push(startNode)
}

export default breadthFirstSearch;
