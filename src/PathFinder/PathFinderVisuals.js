import React from 'react'
// Algorithms
import dijkstra, {getShortestPath} from '../Algorithms/dijkstra';

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
    const [mousePressedState, setMousePressedState] = useState(false);


    useEffect(() => {
        const grid = [];

        setUpGrid(grid)

        setGridState(grid);
    }, [])


    function visualizeDijkstra (grid) {
        const startNode = grid[START_NODE_ROW][START_NODE_COLUMN];
        const endNode = grid[END_NODE_ROW][END_NODE_COLUMN];
    
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
        const shortestPath = getShortestPath(endNode);

        console.log(shortestPath)
        animateDijkstra(visitedNodesInOrder, grid)
    }
    

    
    function animateDijkstra (visitedNodesInOrder, grid) {

        const ANIMATION_SPEED = 50;

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
            }, ANIMATION_SPEED * i);

        }
    }



    function handleMouseDownEvent (row, column) {
        const updatedGrid = getGridWithToggledWall(gridState, row, column)
        setGridState(updatedGrid)
        setMousePressedState(true);
        // console.log('Mouse down event', row, column)

        console.log(updatedGrid[row][column])
    } 
    
    function handleMouseEnterEvent (row, column) {
        if (!mousePressedState) {
            return;
        }

        const updatedGrid = getGridWithToggledWall(gridState, row, column)
        setGridState(updatedGrid)

        // console.log('Mouse enter event', row, column)
    }


    function handleMouseUpEvent () {
        setMousePressedState(false);
        // console.log('Mouse up event')
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

                                    const {
                                        row, 
                                        column, 
                                        isStart, 
                                        isEnd, 
                                        isVisited,
                                        isWall
                                    } = node;


                                    return (
                                        <Node 
                                            key={nodeId}
                                            nodeRow={row}
                                            nodeColumn={column}
                                            startNode={isStart}
                                            endNode={isEnd}
                                            visited={isVisited}
                                            wall={isWall}

                                            mouseDownEventHandler={(row, column) => {
                                                handleMouseDownEvent(row, column);
                                            }}

                                            mouseUpEventHandler={() => {
                                                handleMouseUpEvent();
                                            }}

                                            mouseEnterEventHandler={(row, column) => {
                                                handleMouseEnterEvent(row, column);
                                            }}
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





function setUpGrid (grid) {
    
    for (let row = 0; row < GRID_ROW_LENGTH; row++) {
        const currentRow = [];

        for (let column = 0; column < GRID_COL_LENGTH; column++) {
            const currentNode = {
                row,
                column,
                isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
                isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
                previousNode: null,     // The previous node of every node starts at null
                isWall: false           // None of the nodes are walls initially
            }

            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
}





function getGridWithToggledWall (grid, row, column) {
    const newGrid = grid.slice();
    const node = newGrid[row][column];

    const newNode = {
        ...node,
        isWall: !node.isWall,
    };

    newGrid[row][column] = newNode;
    return newGrid;
}

export default PathFinder
