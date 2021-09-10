function dijkstra (graph, startNode, endNode) {
    const visitedNodesInOrder = [];

    const unvisitedNodes = getAllNodes(graph);
    setInitialNodes(unvisitedNodes, startNode)

    // let functionRan = false;
    while (!!unvisitedNodes.length) { // After every shift, the amount of unvisited nodes will decrease by 1 until there are none left
        sortNodesByDistance(unvisitedNodes);   
        
        const nearestNode = unvisitedNodes.shift(); // The starting node will always have a distance of 0 so the starting node should always be shifted first 
        
        nearestNode.visited = true; // The current node being evaluated in the while loop is visited
        visitedNodesInOrder.push(nearestNode)

        // if (nearestNode.distance === Infinity) {
        //     console.log('hello')
        //     // return visitedNodesInOrder;
        // }

        if (nearestNode === endNode) {  // When the end node gets reached return all of the nodes in order that it took to get there
            return visitedNodesInOrder
        }
        
        updateUnvisitedNeighbors(nearestNode, graph)
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







function setInitialNodes (nodes, startNode) {
    nodes.forEach(node => {
        if (node === startNode) {   // Sets the distance of the start node to 0
            node.distance = 0;
            node.visited = true;
        } else {                    // Sets the distance of every other node to infinity
            node.distance = Infinity;
            node.visited = false;
        }
    })
}






function sortNodesByDistance(unvisitedNodes) { // Sorts nodes based on distance (smallest to largest)
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}







function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    
    unvisitedNeighbors.forEach(neighbor => {
        neighbor.distance = (node.distance + 1);
        neighbor.previousNode = node
    }) 
}


function getUnvisitedNeighbors(node, grid) {    // Gets the nearest unvisited neighbor in each direction of the current node
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
    return neighbors.filter(neighbor => neighbor.visited === false);   // Returns neighbors that have not been visited
    // console.log(result);
    // console.log(neighbors)

}



export default dijkstra;

