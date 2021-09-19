import React from 'react'
import { Container, Dropdown, Navbar } from 'react-bootstrap';

function NavigationBar () {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">Algorithm Visualizer</Navbar.Brand>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="">Action</Dropdown.Item>
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
