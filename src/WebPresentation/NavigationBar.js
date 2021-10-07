import React from 'react'
import { Button, Container, Dropdown, Navbar } from 'react-bootstrap';
import { visualizeDijkstra } from '../Animations/algorithmAnimations';
import { useState, useEffect, useRef } from 'react';
import dijkstra from '../Algorithms/dijkstra';



function NavigationBar (props) {
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
    const [navButtonText, setNavButtonText] = useState('Choose your Algorithm');


    function handleButtonClick () {
        if (currentAlgorithm == 'dijkstra') {
            visualizeDijkstra(props.gridState)  
        }
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
                    <button onClick={handleButtonClick}>{navButtonText}</button>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
