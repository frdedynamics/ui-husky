import React, { Component } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import ConnectionStatus from './ConnectionStatus';


function Header() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <ConnectionStatus />
          <Navbar.Brand href="/">Husky</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/data">Data</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default Header;