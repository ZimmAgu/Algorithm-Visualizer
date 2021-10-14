import React from 'react'

// Grid Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions.js'

import { Button, Container, Dropdown, Navbar } from 'react-bootstrap';
import { visualizeDijkstra, visualizeDFS } from '../Animations/algorithmAnimations';

import { useState } from 'react';
import { getAllNodes } from '../Grid/gridFunctions.js';



function NavigationBar (props) {
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
    const [navButtonText, setNavButtonText] = useState('Visualize');


    function handleVisualizeButton () {
        if (currentAlgorithm == null) {
            setNavButtonText('Choose an Algorithm')
        }

        if (currentAlgorithm === 'dijkstra') {
            runDijkstra(props)   
        }


        if (currentAlgorithm === 'DFS') {
            visualizeDFS(props.gridState)
        }
    }

    function handleWallClearing () { // Sets wall object for wall nodes to false and removes wall CSS
        clearWalls(props)
    }


    function handleBoardReset () { // Resets the board back to it's initial state
        
        resetBoard(props, setCurrentAlgorithm, setNavButtonText)
        
    }



    function handleDijkstraDropdown () {
        setCurrentAlgorithm('dijkstra')
        setNavButtonText('Visualize Dijkstras Algorithm')
    }


    function handleDFSDropdown () {
        setCurrentAlgorithm('DFS')
        setNavButtonText('Visualize Depth First Search Algorithm')
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
                            <Dropdown.Item onClick={handleDFSDropdown}>Depth First Search</Dropdown.Item>
                            <Dropdown.Item href="">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}






function runDijkstra (props) {
    props.setAlgorithmInProgress(true)
            
    visualizeDijkstra(props.gridState)

    const visitedNodes = visualizeDijkstra(props.gridState).length

    // console.log(visualizeDijkstra(props.gridState).length)
    

    for (let i = 0; i <= visitedNodes; i++) {
        if (i === visitedNodes) {
            setTimeout(() =>{
                props.setAlgorithmInProgress(false)
            }, 50 * i)
        }
    }    
}




function resetBoard (props, setCurrentAlgorithm, setNavButtonText) {
    const newGrid = props.gridState.slice();
    const nodes = getAllNodes(newGrid);

    
    nodes.forEach(node => { 
        const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
        
        if (props.algorithmInProgress !== true) { // Makes sure the board can only be reset when an algorithm is not running
            node.isStart = false;
            node.isEnd = false;
            node.visited = false;
            node.isWall = false;
            node.previousNode = null;


            currentNode.classList.remove('visited')
            currentNode.classList.remove('shortestPathNode')
            currentNode.classList.remove('wall')
        
        
            newGrid[START_NODE_ROW][START_NODE_COLUMN].isStart = true;
            newGrid[END_NODE_ROW][END_NODE_COLUMN].isEnd = true;
            
            props.setGridState(newGrid)
            setCurrentAlgorithm(null)
            setNavButtonText('Visualize')
        }
    })
}





function clearWalls (props) {
    const newGrid = props.gridState.slice();
    const nodes = getAllNodes(newGrid);

    if (props.algorithmInProgress !== true) { // Makes sure walls can only be cleared in an algorithm is not running
        nodes.forEach(node => {
            const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
                
            node.isWall = false;
            currentNode.classList.remove('wall')
        })
    }
}




export default NavigationBar
