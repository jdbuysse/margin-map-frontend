import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, CardGroup
} from 'reactstrap';
import annoImg from '../images/annotation.PNG'


const LessonCard = ({lesson, preview}) => {

    return (
        <div>
            <Row>
            <CardGroup>
            <Card>
                <CardImg src={annoImg} alt="lesson image cap" />
                <CardBody>
                    <CardTitle>{lesson.name}</CardTitle>
                    <CardText>{preview}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
            </CardGroup>
            </Row>
        </div>
    )
}

export default LessonCard;