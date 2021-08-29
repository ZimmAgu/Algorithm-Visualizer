import React from 'react'

// CSS Imports
import './PathFinderVisuals.css'

// Hook Imports
import { useEffect, useState } from 'react';

import Node from './Node'

const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 30;


function PathFinder () {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        const grid = [];

        for (let row = 0; row < GRID_ROW_LENGTH; row++) {
            const currentRow = [];

            for (let col = 0; col < GRID_COL_LENGTH; col++) {
                currentRow.push([]);
            }
            grid.push(currentRow);
        }

        setNodes(grid);
    }, [])

    console.log(nodes)

    return (
        <div className="grid">
            {nodes.map((row, rowId) => {
                return (
                    <div key={rowId}>
                        {row.map((node, nodeId) => <Node key={nodeId}></Node>)}
                    </div>
                )
            })}
        </div>
    );
}

export default PathFinder
