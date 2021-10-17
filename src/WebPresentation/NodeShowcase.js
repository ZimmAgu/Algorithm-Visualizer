
import React from 'react'
import "./NodeShowcase.css"



function NodeShowcase () {
    return (
        <>
            <div className="showcaseOutline">
                <span>Unvisited Node</span>
                <div className="nodeShowcase unvisitedShowcase"></div>

                <span>Visited Node</span>
                <div className="nodeShowcase visitedShowcase"></div>

                <span>Shortest Path</span>
                <div className="nodeShowcase shortestPathShowcase"></div>

                <span>Start Node</span>
                <div className="nodeShowcase startNodeShowcase"></div>

                <span>Destination Node</span>
                <div className="nodeShowcase endNodeShowcase"></div>
            </div>
        </>
    )
}

export default NodeShowcase
