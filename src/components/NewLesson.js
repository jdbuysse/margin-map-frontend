import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const NewLesson = () => {
    return (
        <div>
            <Col sm={{ size: 6, order: 2, offset: 3 }}>
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Lesson Title</Label>
                        <Col sm={10}>
                            <Input type="title" name="title" id="title" placeholder="Enter lesson title" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="classSelect" sm={2}>Select Class</Label>
                        <Col sm={10}>
                            <Input type="select" name="select" id="classSelect">
                                <option>English 201</option>
                                <option>Creative Writing 204</option>
                                <option>Seminar in Basket Weaving</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="snippet" sm={2}>Text Area</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="text" id="exampleText" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleFile" sm={2}>File</Label>
                        <Col sm={10}>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                You can upload a .txt or .docx of your lesson text here, or use the box above 
                            </FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </div>
    )
}

export default NewLesson;