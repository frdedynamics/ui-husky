import React, { Component } from 'react'
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import RobotState from './RobotState';
import {Row, Col, Container} from 'react-bootstrap'

class Home extends Component {
    state = {};
    render() { 
        return (
        <div>
            <Container>
            <h1 className='text-center mt-3'>Controll Panel</h1>
            <Row>
                <Col>
                    <Connection />
                </Col>
                <Col>
                    <Teleoperation />
                </Col>
            </Row>
            <Row>
                <Col>
                <RobotState />
                </Col>
            </Row>
            </Container>
        </div>
        );
    }
}
 
export default Home;