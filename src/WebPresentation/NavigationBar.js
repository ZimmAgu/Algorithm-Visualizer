import React from 'react'
import { Button, Container, Dropdown, Navbar } from 'react-bootstrap';
import { visualizeDijkstra } from '../Animations/algorithmAnimations';




function NavigationBar (props) {
    function handleButtonClick () {
        visualizeDijkstra(props.gridState)
    }


    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">Algorithm Visualizer</Navbar.Brand>
                    <button onClick={handleButtonClick}>Visualize Dijkstra's Algorithm</button>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="">Dijkstra</Dropdown.Item>
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
