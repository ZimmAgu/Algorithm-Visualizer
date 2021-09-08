function dijkstra (graph, startNode, endNode) {
    const allNodesInGraph = getAllNodes(graph);
    setInitialNodeDistance(allNodesInGraph, startNode)
    console.log(graph)

    
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
        if (node === startNode) {
            node.distance = 0;
        } else {
            node.distance = Infinity;
        }
    })
}
  







export default dijkstra;

