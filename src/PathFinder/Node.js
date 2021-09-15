import React from 'react'

// CSS Imports
import "./Node.css"

function Node (props) {
    const {
        nodeRow,
        nodeColumn,
        startNode, 
        endNode, 
        visited,
        wall,
        mouseDownEventHandler,
        mouseUpEventHandler,
        mouseEnterEventHandler
    } = props;


    const nodeColorClass = (
        startNode ? 'startNode' 
        : endNode ? 'endNode' 
        : visited ? 'visited' 
        : wall ? 'wall'
        : ''
    );
    
    return (
        <div 
            className={`node ${nodeColorClass}`}
            onMouseDown={() => mouseDownEventHandler(nodeRow, nodeColumn)}
            onMouseUp={() => mouseUpEventHandler()}
            onMouseEnter={() => mouseEnterEventHandler(nodeRow, nodeColumn)}
        >
        </div>
    )
}

export default Node
