// These are the animations that can be used in any algorithms such as visiting neighbors and animating the shortest path
import React from 'react'




let ANIMATION_SPEED = 50;



function UniversalAnimations(props) {
    ANIMATION_SPEED = props.mySpeed
    return (
        <>
            
        </>
    )
}





function animateAlgorithm (visitedNodesInOrder, shortestPath) {
    // console.log(ANIMATION_SPEED)
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() =>{
                animateShortestPath(shortestPath); 
            }, ANIMATION_SPEED * i)
        }
    }
    

    animateNeighborVisitation(visitedNodesInOrder);
}



function animateNeighborVisitation (visitedNodesInOrder) {

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        const node = visitedNodesInOrder[i]
        setTimeout(() => {
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`)  // Gets each visited node by its id

            if (!currentNode.classList.contains("startNode")) { // I don't want to color the start node
                currentNode.classList.add("visited")    // Adds a visited class to it so the CSS class can style it
            }
            
        }, ANIMATION_SPEED * i);
    }

}




function animateShortestPath (shortestPathNodes) {

    for (let i = 0; i < shortestPathNodes.length; i++) {
        const node = shortestPathNodes[i]
        setTimeout(() => {
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`)  // Gets each visited node by its id

            if (!currentNode.classList.contains("startNode") && !currentNode.classList.contains("endNode")) {
                currentNode.classList.remove("visited") // Removes the visited class to remove all of the previous coloring of the node
                currentNode.classList.add("shortestPathNode")   // Adds the shortest path class to recolor the nodes
            }
            
        }, ANIMATION_SPEED * i);

    }
    
}

export default UniversalAnimations
export { ANIMATION_SPEED, animateAlgorithm, animateShortestPath, animateNeighborVisitation }

