import React, { useState, useEffect } from 'react';
import '../styles/teacherdashboard.css';
import { Accordion, Card } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import LessonCard from './LessonCard';


const TeacherDashboard = () => {
    const API_URL = 'http://localhost:5000'

    const [lessons, setLessons] = useState()

    useEffect(() => {
        fetch(`${API_URL}/snippets/`)
            .then(response => response.json())
            .then(data => {
                setLessons(data)
            })
    }, [])

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
                                <Card.Body>
                                    <Row>
                                    <div className="lesson-container">
                                        {lessons && lessons.map((lesson, index) => (
                                            <Col sm="6">
                                                <LessonCard lesson={lesson} key={index} />
                                            </Col>
                                        ))}
                                    </div>
                                    </Row>
                                </Card.Body>
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