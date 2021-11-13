import React from 'react'
import { useState } from 'react';
import { Button, Container, Dropdown, Navbar } from 'react-bootstrap';

// Algorithms Imports
import dijkstra from '../Algorithms/dijkstra.js';
import depthFirstSearch from '../Algorithms/depthFirstSearch.js';
import breadthFirstSearch from '../Algorithms/breadthFirstSearch.js';
import { visualizeAlgorithm } from '../Animations/algorithmAnimations';
import { ANIMATION_SPEED } from '../Animations/universalAnimations.js';
import UniversalAnimations from '../Animations/universalAnimations.js'

// Grid Imports
import { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } from '../Grid/gridFunctions.js'
import { getAllNodes } from '../Grid/gridFunctions.js';


function NavigationBar (props) {
    const [navButtonText, setNavButtonText] = useState('Visualize');
    const [visualizationSpeed, setVisualizationSpeed] = useState(50);
    const [visualizationSpeedText, setVisualizationSpeedText] = useState('Normal')
    

    function handleVisualizeButton () {
        if (props.algorithmInProgress !== true) {
            if (props.currentAlgorithm == null) {
                setNavButtonText('Choose an Algorithm');
            }

            if (props.currentAlgorithm === 'dijkstra') {
                clearVisitations(props);
                runCurrentAlgorithm(props, dijkstra);
            }


            if (props.currentAlgorithm === 'DFS') {
                clearVisitations(props);
                runCurrentAlgorithm(props, depthFirstSearch); 
            }


            if (props.currentAlgorithm === 'BFS') {
                clearVisitations(props);
                runCurrentAlgorithm(props, breadthFirstSearch);
            }
        }
    }

    function handleWallClearing () { // Sets wall object for wall nodes to false and removes wall CSS
        clearWalls(props);
    }


    function handleBoardReset () { // Resets the board back to it's initial state
        resetBoard(props, props.setCurrentAlgorithm, setNavButtonText);
    }



    function handleDijkstraDropdown () {
        props.setCurrentAlgorithm('dijkstra');
        setNavButtonText('Visualize Dijkstras Algorithm');
    }


    function handleDFSDropdown () {
        props.setCurrentAlgorithm('DFS');
        setNavButtonText('Visualize Depth First Search Algorithm');
    }

    function handleBFSDropdown () {
        props.setCurrentAlgorithm('BFS');
        setNavButtonText('Visualize Breadth First Search Algorithm');
    }
    

    function handleSlowSpeedDropDown () {
        if (props.algorithmInProgress !== true) {
            setVisualizationSpeed(75);
            setVisualizationSpeedText("Slow")
        }
    }

    function handleNormalSpeedDropDown () {
        if (props.algorithmInProgress !== true) {
            setVisualizationSpeed(50);
            setVisualizationSpeedText("Normal")
        }
    }

    function handleFastSpeedDropDown () {
        if (props.algorithmInProgress !== true) {
            setVisualizationSpeed(25);
            setVisualizationSpeedText("Fast")
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <UniversalAnimations mySpeed={visualizationSpeed}/>
                <Container>
                    <Navbar.Brand>Algorithm Visualizer</Navbar.Brand>

                    <Button variant="dark" onClick={handleBoardReset}>
                        Reset Board
                    </Button>

                    <Button variant="dark" onClick={handleWallClearing}>
                        Clear Walls
                    </Button>

                    <Button onClick={handleVisualizeButton}>{navButtonText}</Button>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Current Speed: {visualizationSpeedText}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleSlowSpeedDropDown}>Slow</Dropdown.Item>
                            <Dropdown.Item onClick={handleNormalSpeedDropDown}>Normal</Dropdown.Item>
                            <Dropdown.Item onClick={handleFastSpeedDropDown}>Fast</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>



                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Algorithms
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleDijkstraDropdown}>Dijkstra</Dropdown.Item>
                            <Dropdown.Item onClick={handleDFSDropdown}>Depth First Search</Dropdown.Item>
                            <Dropdown.Item onClick={handleBFSDropdown}>Breadth First Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}






function runCurrentAlgorithm (props, algorithm) {
    props.setAlgorithmInProgress(true)
            
    visualizeAlgorithm(props.gridState, algorithm)

    const visitedNodes = visualizeAlgorithm(props.gridState, algorithm)
    const totalRunTime = visitedNodes[0] + visitedNodes[1]  // I make a total run time variable so the program knows the algorithm is running while the neighbors are being visited and while the shortes path is being drawn

    for (let i = 0; i <= totalRunTime; i++) {
        if (i === totalRunTime) {
            setTimeout(() =>{
                props.setAlgorithmInProgress(false)
            }, ANIMATION_SPEED * i)
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
            props.setCurrentAlgorithm(null)
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



function clearVisitations (props) {
    const newGrid = props.gridState.slice();
    const nodes = getAllNodes(newGrid);

    
    nodes.forEach(node => { 
        const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
        node.visited = false;
        node.previousNode = null;


        currentNode.classList.remove('visited')
        currentNode.classList.remove('shortestPathNode')
        
        props.setGridState(newGrid)
    })
}




export default NavigationBar
