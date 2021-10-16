
//Algorithms Imports
import { setInitialNodes, getAllNeighbors } from './depthFirstSearch';
import { updateUnvisitedNeighbors } from './dijkstra.js'

// Grid Imports
import { getAllNodes } from '../Grid/gridFunctions.js'

function breadthFirstSearch (graph, startNode, endNode) {
    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)

    const visitedNodesInOrder = []

    const queue = []
    queue.unshift(startNode)


    while (!!queue.length) {
        // console.log('queue ', queue)

        const currentVertex = queue.shift()   // The vertex at the beginning of the queue is what is being evaluated
        // console.log('Current Vertex', currentVertex)

        if (currentVertex.isWall) {   // If you get to a wall then skip it
            continue;
        }

        if (currentVertex.distance === Infinity) {    // If the distance of the nearest neighbor is infinity something went wrong so the function should return the nodes we have
            return visitedNodesInOrder;
        }


        if (currentVertex === endNode) { // Once the function has reached the endnode, all of the nodes in order of when we visited them will be returned. this is the goal
            return visitedNodesInOrder
        }


        if (currentVertex.visited === true) {   // If the current vertex has already been visited, move on to the next iteration of the loop 
            continue
        }

        if (currentVertex.visited === false) {   // If the current vertex has not been visited yet, it is marked as visited
            currentVertex.visited = true
            visitedNodesInOrder.push(currentVertex)
        }


        const neighbors = getAllNeighbors(currentVertex, graph) // I then get all of the adjecent neighbors to the current vertex
        
        
        
        neighbors.forEach(neighbor => { // If these neighbors are not visited, then they are added to the end of the queue and the function loops again
            if (neighbor.visited === false) {
                queue.push(neighbor)    
            }
        })

        updateUnvisitedNeighbors(currentVertex, graph)
    }


    if (!visitedNodesInOrder.includes(endNode)) {   // At the end of the function, if it is impossible to reach the end node, return the nodes we have
        return visitedNodesInOrder
    }
}




export default breadthFirstSearch;
