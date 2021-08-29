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

            for (let column = 0; column < GRID_COL_LENGTH; column++) {
                const currentNode = {
                    row,
                    column,
                    isStart: row === 5 && column === 5,
                    isEnd: row === 5 && column === 20,
                }

                currentRow.push(currentNode);
            }
            grid.push(currentRow);
        }

        setNodes(grid);
    }, [])


    return (
        <div className="grid">
            {nodes.map((row, rowId) => {
                return (
                    <div key={rowId}>
                        {
                            row.map((node, nodeId) => {
                                const {isStart, isEnd} = node;
                                return (
                                    <Node 
                                        key={nodeId}
                                        startNode={isStart}
                                        endNode={isEnd}
                                    >
                                    </Node>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default PathFinder
