function dijkstra (graph, startNode, endNode) {
    const visitedNodesInOrder = [];

    const unvisitedNodes = getAllNodes(graph);
    setInitialNodeDistance(unvisitedNodes, startNode)

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);   
        const nearestNode = unvisitedNodes.shift(); // The starting node will always have a distance of 0 so the starting node should always be shifted first 
        console.log(nearestNode);
    }
    
}


function getAllNodes (grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}



function setInitialNodeDistance (nodes, startNode) {
    nodes.forEach(node => {
        if (node === startNode) {   // Sets the distance of the start node to 0
            node.distance = 0;
        } else {                    // Sets the distance of every other node to infinity
            node.distance = Infinity;
        }
    })
}
  
function sortNodesByDistance(unvisitedNodes) { // Sorts nodes based on distance (smallest to largest)
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}






export default dijkstra;

