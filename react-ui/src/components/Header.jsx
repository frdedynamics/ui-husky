import React, { Component } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import ConnectionStatus from './ConnectionStatus';


class Header extends Component {
  state = {}
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <ConnectionStatus />
          <Navbar.Brand href="#home">Husky</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Button variant='primary'>Send</Button>
              <Button>Remove</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;