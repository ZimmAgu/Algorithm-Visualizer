import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

function NavigationBar () {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">Algorithm Visualizer</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar
