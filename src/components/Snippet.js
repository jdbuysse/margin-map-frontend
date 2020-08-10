import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
//import {BrowserRouter as Router, Route} from 'react-router-dom';
import Highlightable from "highlightable";

const Snippet = (lessons) => {
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState();

  useEffect(() => {
    lessons === null ? console.log('not loaded') : console.log('loaded', lessons.lessons[0]._id)
    let id = lessons.lessons[0]._id
    fetch(`${API_URL}/snippets/${id}`)
    .then(response => response.json())
    .then(data => {
      setAnnotations(data.annotations)
    })
  }, [lessons])

  const onMouseOverHighlightedWordCallback = useCallback(() =>{
    console.log('hi-lite')
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
          <Highlightable
            ranges={[
              {
                start: 0,
                end: 10,
                text: "",
                data: {}
              }
            ]}
            enabled={true}
            id={0}
            onMouseOverHighlightedWord={onMouseOverHighlightedWordCallback()}
            highlightStyle={{
              backgroundColor: '#ffcc80'
            }}
            text={lessons && lessons.lessons[0].body}
          />
          </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}><li>{annotations && annotations[0].content}</li><li>{annotations && annotations[1].content}</li></Col>
        </Row>
        <Col>  
        </Col>
      </Container>
    </div>
  );
}

export default Snippet;