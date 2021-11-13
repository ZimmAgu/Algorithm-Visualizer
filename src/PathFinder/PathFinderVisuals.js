import React from 'react'

// CSS Imports
import './PathFinderVisuals.css'

// Grid Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions.js'

// Hook Imports
import { useEffect, useState } from 'react';

// PathFinder Imports
import { setUpGrid, getGridWithToggledWall, getAllNodes } from '../Grid/gridFunctions.js';
import Node from './Node.js'

// Web Presentation Imports
import AlgoDescription from '../WebPresentation/AlgoDescription.js';
import NavigationBar from '../WebPresentation/NavigationBar.js';
import NodeShowcase from '../WebPresentation/NodeShowcase.js';






function PathFinder (props) {
    const [gridState, setGridState] = useState([]);
    const [mousePressedState, setMousePressedState] = useState(false);
    const [startNodeDragState, setStartNodeDragState] = useState(false);
    const [endNodeDragState, setEndNodeDragState] = useState(false);
    const [algorithmInProgress, setAlgorithmInProgress] = useState(false);
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
    




    useEffect(() => {
        const grid = [];

        setUpGrid(grid);

        setGridState(grid);
    }, [])


    useEffect(() => {
        setDraggableObjects(gridState);
        make_Sure_Start_and_End_Never_Overlap(gridState);
        make_Sure_Start_and_End_Are_Not_Walls(gridState)
    })


    function handleMouseDownEvent (row, column) {
        if (algorithmInProgress !== true) {
            const updatedGrid = getGridWithToggledWall(gridState, row, column)
            setGridState(updatedGrid)
            setMousePressedState(true);
        }  
        
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


    function handleDragStartEvent (row, column) {
        const newGrid = gridState.slice();
        const node = newGrid[row][column];

        if (algorithmInProgress !== true) {
            if (node.isStart) {
                setStartNodeDragState(true);
                node.isStart = false;
            }

            if (node.isEnd) {
                setEndNodeDragState(true);
                node.isEnd = false;
            }
        }
        
        setGridState(newGrid);
        
        // console.log('Drag Start Event', row, column);
    } 

    function handleDragOver (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function handleDragEndEvent () {
        setMousePressedState(false)

        const newGrid = gridState.slice();

        if (startNodeDragState === true) {  // If the user drags the start node off of the screen, it will automatically snap back to its default position  
            newGrid[START_NODE_ROW][START_NODE_COLUMN].isWall = false;
            newGrid[START_NODE_ROW][START_NODE_COLUMN].isStart = true;
            setStartNodeDragState(false);
        }

        if (endNodeDragState === true) { // If the user drags the end node off of the screen, it will automatically snap back to its default position 
            newGrid[END_NODE_ROW][END_NODE_COLUMN].isWall = false;
            newGrid[END_NODE_ROW][END_NODE_COLUMN].isEnd = true;
            setEndNodeDragState(false);
        }

        setGridState(newGrid);
    }

    function handleDropEvent (row, column) {
        setMousePressedState(false);

        const newGrid = gridState.slice();
        const node = newGrid[row][column];
        
        if (startNodeDragState === true) {  // If the start node is being dragged, then the node being dropped on is now the start node
            node.isStart = true;   
            setStartNodeDragState(false);
        }

        if (endNodeDragState === true) {    // If the end node is being dragged, then the node being dropped on is now the end node
            node.isEnd = true;   
            setEndNodeDragState(false);
        }
        

        setGridState(newGrid);

        // console.log('Drop Event', row, column)
    }


    function make_Sure_Start_and_End_Never_Overlap (gridState) {
        const nodes = getAllNodes(gridState);

        
        for (let i = 0; i < nodes.length; i++ ) { 
            if (nodes[i].isStart && nodes[i].isEnd) {   // If a start node is placed over an end node, the end node will move over by 2 spaces
                nodes[i].isEnd = false;
                
                if (nodes[i + 2] === undefined) {   // If the end node is about to get sent off the graph
                    nodes[2].isEnd = true;
                } else {
                    nodes[i + 2].isEnd = true; 
                }
                
            }
        }
    }


    function make_Sure_Start_and_End_Are_Not_Walls (gridState) {
        const nodes = getAllNodes(gridState);

        for (let i = 0; i < nodes.length; i++ ) { 
            if (nodes[i].isStart && nodes[i].isWall) { 
                nodes[i].isWall = false;
            }

            if (nodes[i].isEnd && nodes[i].isWall) { 
                nodes[i].isWall = false;
            }
        }
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
            <NavigationBar 
                gridState={gridState} 
                setGridState={setGridState}
                algorithmInProgress={algorithmInProgress}
                setAlgorithmInProgress={setAlgorithmInProgress}
                currentAlgorithm={currentAlgorithm}
                setCurrentAlgorithm={setCurrentAlgorithm}
            ></NavigationBar>

            <NodeShowcase />
            
            <AlgoDescription
                currentAlgorithm={currentAlgorithm}
                setCurrentAlgorithm={setCurrentAlgorithm} 
            />

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

                                            dragStartEventHandler={(row, column) => {
                                                handleDragStartEvent(row, column);
                                            }}

                                            dragOverEventHandler={(event) => {
                                                handleDragOver(event)
                                            }}

                                            dragEndEventHandler={() => {
                                                handleDragEndEvent();
                                            }}

                                            dropEventHandler={(row, column) => {
                                                handleDropEvent(row, column)
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