import React, { Component } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import ConnectionStatus from './ConnectionStatus';
import RobotState from './RobotState'
import SendData from './SendData';
import ResetData from './ResetData';

/*
Navigation bar that display connaction status and input menue
*/
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
              <SendData />
          <ResetData />
            </Nav>
          <RobotState />
          </Navbar.Collapse>

        </Container>
      </Navbar>
    );
  }

export default Header;