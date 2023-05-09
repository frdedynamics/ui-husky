import React, { Component } from 'react';
import Teleoperation from './Teleoperation';
import { Row, Col, Container } from 'react-bootstrap'
import RobotTeleStatus from './RobotTeleStatus';

class RemoteControl extends Component {
  state = {}
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