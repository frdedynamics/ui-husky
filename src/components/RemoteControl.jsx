import React, { Component } from 'react';
import Teleoperation from './Teleoperation';
import { Row, Col, Container } from 'react-bootstrap'
import RobotTeleStatus from './RobotTeleStatus';

class RemoteControl extends Component {
  state = {}
  /* `render() {` is a method in a React component that returns the JSX (JavaScript XML) code that
  defines the structure and content of the component. It is responsible for rendering a 
  RemoteControl component, which includes a RobotTeleStatus component and a Teleoperation component. */
  render() {
    return (
      <div>
        <Container>
          <h1>Control Panel</h1>
          <Row>
            <Col>
              <RobotTeleStatus />
            </Col>
            <Col>
              <Row>
                <Container className='p-2'>
                  <h3>Joystick</h3>
                  <Teleoperation />
                </Container>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default RemoteControl;