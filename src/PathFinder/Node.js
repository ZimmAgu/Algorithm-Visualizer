import React from 'react'

// CSS Imports
import "./Node.css"

function Node (props) {
    const {
        nodeRow,
        nodeColumn,
        startNode, 
        endNode, 
        wall,
        mouseDownEventHandler,
        mouseUpEventHandler,
        mouseEnterEventHandler,
        dragStartEventHandler,
        dragOverEventHandler,
        dropEventHandler
    } = props;


    const nodeColorClass = (
        startNode ? 'startNode' 
        : endNode ? 'endNode' 
        : wall ? 'wall'
        : ''
    );
    
    return (
        <div 
            id={`node-${nodeRow}-${nodeColumn}`}
            className={`node ${nodeColorClass}`}
            onMouseDown={() => mouseDownEventHandler(nodeRow, nodeColumn)}
            onMouseUp={() => mouseUpEventHandler()}
            onMouseEnter={() => mouseEnterEventHandler(nodeRow, nodeColumn)}
            onDragStart={() => dragStartEventHandler(nodeRow, nodeColumn)}
            onDragOver={(event) => dragOverEventHandler(event)}
            onDrop={() => dropEventHandler(nodeRow, nodeColumn)}
        >
        </div>
    )
}

export default Node
