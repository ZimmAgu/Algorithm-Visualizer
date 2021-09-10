import React from 'react'

// CSS Imports
import "./Node.css"

function Node (props) {
    const {
        startNode, 
        endNode, 
        visited
    } = props;

    
    const nodeColorClass = (
        startNode ? 'startNode' 
        : endNode ? 'endNode' 
        : visited ? 'visited' 
        : ''
    );
    
    return (
        <div className={`node ${nodeColorClass}`}>

        </div>
    )
}

export default Node
