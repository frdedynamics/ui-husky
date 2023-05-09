import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import ConnectionStatus from './ConnectionStatus';
import RobotState from './RobotState'
import SendData from './SendData';
import ResetData from './ResetData';
import { useLocation } from 'react-router-dom';

/*
Navigation bar that display connaction status and input menue
*/
function Header() {
  const { pathname } = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <ConnectionStatus />
        <Navbar.Brand href="/">Robot Control</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* This is a conditional hides buttons when not in showing root('/'). 
          If MapComp is moved from root this condition most change to reflect that or the buttons will not appear */}
          {pathname === '/' ?
            <Nav className="me-auto">
              <Nav.Link href="/">Map</Nav.Link>
              <Nav.Link href="/remote-control">Remote Control</Nav.Link>
              <div>
                <SendData />
                <ResetData />
              </div>
            </Nav>
            :
            <Nav className="me-auto">
              <Nav.Link href="/">Map</Nav.Link>
              <Nav.Link href="/remote-control">Remote Control</Nav.Link>
            </Nav>
          }
          <RobotState />
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;