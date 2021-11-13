import React from 'react'
import "./AlgoDescription.css"


// Hook Imports
import { useEffect, useState } from 'react';

function AlgoDescription (props) {
    const [currentDescription, setCurrentDescription] = useState("");

    useEffect(() => {
        if (props.currentAlgorithm === null) {
            setCurrentDescription("")
        }

        if (props.currentAlgorithm === 'dijkstra') {
            setCurrentDescription("Dijkstra's Algorithm gurantees the shortest path")
        }

        if (props.currentAlgorithm === 'DFS') {
            setCurrentDescription("Depth First Search gurantees the shortest path")
        }

        if (props.currentAlgorithm === 'BFS') {
            setCurrentDescription("Breadth First Search does not gurantee the shortest path")
        }
    }, [props.currentAlgorithm]);

    return (
        <div className="descriptionText">
            {currentDescription}
        </div>
    )
}

export default AlgoDescription
