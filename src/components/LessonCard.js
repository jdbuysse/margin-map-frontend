import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Row, CardGroup
} from 'reactstrap';
import annoImg from '../images/annotation.PNG'
import '../styles/lessonCard.css';
import {BrowserRouter as Route} from 'react-router-dom';


const LessonCard = ({lesson, preview}) => {

    return (
        <div>
            <Row>
            <CardGroup>
            <Card>
                <CardImg src={annoImg} alt="lesson image cap" />
                <CardBody>
                    <CardTitle className="lesson-title">{lesson.name}</CardTitle>
                    <CardText>{preview}</CardText>
                    <Route>
                        <Button href={`/snippet/${lesson._id}`}>Button</Button>
                    </Route>
                </CardBody>
            </Card>
            </CardGroup>
            </Row>
        </div>
    )
}

export default LessonCard;