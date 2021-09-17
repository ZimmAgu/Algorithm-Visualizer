import React from 'react'

// CSS Imports
import './PathFinderVisuals.css'

// Hook Imports
import { useEffect, useState } from 'react';

// PathFinder Imports
import { setUpGrid, getGridWithToggledWall, getAllNodes } from '../Grid/gridFunctions.js';
import Node from './Node.js'

// Visuals Imports
import { visualizeDijkstra } from '../Animations/algorithmAnimations.js';






function PathFinder () {
    const [gridState, setGridState] = useState([]);
    const [mousePressedState, setMousePressedState] = useState(false);


    useEffect(() => {
        const grid = [];

        setUpGrid(grid);

        setGridState(grid);

        
    }, [])

    useEffect(() => {
        setDraggableObjects(gridState);
    })


    function handleMouseDownEvent (row, column) {
        const updatedGrid = getGridWithToggledWall(gridState, row, column)
        setGridState(updatedGrid)
        setMousePressedState(true);
        // console.log('Mouse down event', row, column)
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

    function setDraggableObjects (gridState) {
        const nodes = getAllNodes(gridState);
        
        nodes.forEach(node => {
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`);

            if (node.isStart || node.isEnd) {   // The starting and the ending nodes are draggable
                currentNode.draggable = true;
            }
        })
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
                                        isWall
                                    } = node;


                                    return (
                                        <Node 
                                            key={nodeId}
                                            nodeRow={row}
                                            nodeColumn={column}
                                            startNode={isStart}
                                            endNode={isEnd}
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



export default PathFinder
