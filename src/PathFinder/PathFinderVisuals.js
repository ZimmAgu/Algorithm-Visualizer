import React from 'react'
// Algorithms
import dijkstra from '../Algorithms/dijkstra';

// CSS Imports
import './PathFinderVisuals.css'

// Hook Imports
import { useEffect, useState } from 'react';

import Node from './Node'

const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 30;

const START_NODE_ROW = 5;
const START_NODE_COLUMN = 5;

const END_NODE_ROW = 5;
const END_NODE_COLUMN = 20;

function PathFinder () {
    const [gridState, setGridState] = useState([]);

    useEffect(() => {
        const grid = [];

        setUpGrid(grid)

        setGridState(grid);
    }, [])


    function visualizeDijkstra (grid) {
        const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
        const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];
    
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    
        animateDijkstra(visitedNodesInOrder, grid)
    }
    

    
    function animateDijkstra (visitedNodesInOrder, grid) {
        console.log(visitedNodesInOrder)

        // visitedNodesInOrder.forEach(node => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i]
            setTimeout(() => {
            const newGrid = grid.slice()

            const newnode = {
                ...node,
                isVisited: true
            }


            newGrid[node.row][node.column] = newnode;
                setGridState(newGrid)
            }, 100 * i);

        }
            

        // })
    }

    


    return (
        <>
            <button onClick={() => visualizeDijkstra(gridState)}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {gridState.map((row, rowId) => {
                    return (
                        <div key={rowId}>
                            {
                                row.map((node, nodeId) => {
                                    const {isStart, isEnd, isVisited} = node;
                                    return (
                                        <Node 
                                            key={nodeId}
                                            startNode={isStart}
                                            endNode={isEnd}
                                            visited={isVisited}
                                        >
                                        </Node>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </>
    );
}



// function visualizeDijkstra (grid) {
//     const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
//     const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];

//     const visitedNodesInOrder = dijkstra(grid, startNode, endNode)

//     animateDijkstra(visitedNodesInOrder)
// }


// function animateDijkstra (visitedNodesInOrder) {
//     console.log(visitedNodesInOrder)
//     // visitedNodesInOrder.forEach(node => {
//     //     const newGrid = grid
//     // })
// }


function setUpGrid (grid) {
    
    for (let row = 0; row < GRID_ROW_LENGTH; row++) {
        const currentRow = [];

        for (let column = 0; column < GRID_COL_LENGTH; column++) {
            const currentNode = {
                row,
                column,
                isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
                isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
            }

            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
}

export default PathFinder
