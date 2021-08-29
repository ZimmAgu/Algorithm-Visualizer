import React from 'react'

// CSS Imports
import "./Node.css"

function Node (props) {
    const {startNode, endNode} = props;
    const nodeColorClass = startNode ? 'startNode' : endNode ? 'endNode' : '';
    
    return (
        <div className={`node ${nodeColorClass}`}>

        </div>
    )
}

export default Node
