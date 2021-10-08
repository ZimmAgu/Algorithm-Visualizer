import React from 'react'

// Grdi Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions.js'

import { Button, Container, Dropdown, Navbar } from 'react-bootstrap';
import { visualizeDijkstra } from '../Animations/algorithmAnimations';


import { useState, useEffect, useRef } from 'react';
import dijkstra from '../Algorithms/dijkstra';
import { getAllNodes } from '../Grid/gridFunctions.js';



function NavigationBar (props) {
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
    const [navButtonText, setNavButtonText] = useState('Visualize');


    function handleVisualizeButton () {
        if (currentAlgorithm == null) {
            setNavButtonText('Choose an Algorithm')
        }

        if (currentAlgorithm == 'dijkstra') {
            visualizeDijkstra(props.gridState)  
        }
    }

    function handleWallClearing () { // Sets wall object for wall nodes to false and removes wall CSS
        const newGrid = props.gridState.slice();
        const nodes = getAllNodes(newGrid);

        nodes.forEach(node => {
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
                
            node.isWall = false;
            currentNode.classList.remove('wall')
        })
    }


    function handleBoardReset () { // Resets the board back to it's initial state
        const newGrid = props.gridState.slice();
        const nodes = getAllNodes(newGrid);
        handleWallClearing()

        nodes.forEach(node => { 
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
            
            node.visited = false;
            currentNode.classList.remove('visited')
            currentNode.classList.remove('shortestPathNode')

            if (node.isStart) {
                node.isStart = false;
                newGrid[START_NODE_ROW][START_NODE_COLUMN].isStart = true;
            }

            if (node.isEnd) {
                node.isEnd = false;
                newGrid[END_NODE_ROW][END_NODE_COLUMN].isEnd = true;
            }

        })

        props.setGridState(newGrid)
    }



    function handleDijkstraDropdown () {
        setCurrentAlgorithm('dijkstra')
        setNavButtonText('Visualize Dijkstras Algorithm')
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">Algorithm Visualizer</Navbar.Brand>

                    <Button onClick={handleVisualizeButton}>{navButtonText}</Button>


                    <Button variant="secondary" onClick={handleBoardReset}>
                        Reset Board
                    </Button>

                    <Button variant="secondary" onClick={handleWallClearing}>
                        Clear Walls
                    </Button>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Algorithms
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleDijkstraDropdown}>Dijkstra</Dropdown.Item>
                            <Dropdown.Item href="">Another action</Dropdown.Item>
                            <Dropdown.Item href="">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar
