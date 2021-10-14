
//Algorithms Imports
import { setInitialNodes,sortNodesByDistance, getUnvisitedNeighbors, updateUnvisitedNeighbors } from './dijkstra.js'

// Grid Imports
import { getAllNodes } from '../Grid/gridFunctions.js'

function depthFirstSearch (graph, startNode, endNode) {
    const stack = [];

    
    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)
    console.log(startNode)
    console.log(endNode)
    
    console.log(getUnvisitedNeighbors(startNode, graph))

    // while (!!unvisitedNodes.length) {
    //     sortNodesByDistance(unvisitedNodes)
    // }
}




export default depthFirstSearch;