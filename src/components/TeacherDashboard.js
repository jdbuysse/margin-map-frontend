import React, { useState } from 'react';
import '../styles/teacherdashboard.css';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Container, Row, Col} from 'reactstrap';

const TeacherDashboard = () => {

    return (
        <div className="dashboard-wrapper">
            <Row>
            <Col className="dashboard-accordions" sm={{ size: 8, order: 2, offset: 0 }}>
            <Accordion defaultActiveKey="0">
                <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="accordion-1">
                            Recent Lessons
                        </Accordion.Toggle>
                    
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                            Classes
                    </Accordion.Toggle>
                  
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                            Students
                    </Accordion.Toggle>
                  
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            </Col>
            </Row>
        </div>
    );
}

export default TeacherDashboard;