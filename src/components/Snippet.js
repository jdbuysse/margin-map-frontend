import React, {useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
//import {BrowserRouter as Router, Route} from 'react-router-dom';


const Snippet = (lessons) => {
    useEffect(() => {
        lessons !== null ? console.log('null') : console.log('hi')
      }, [] )
    
    return (
        <div>
          <Container>
            <Row>
              <Col sm={{ size: 6, order: 2, offset: 0 }}>{ lessons && lessons.lessons[0].body}</Col>
            </Row>
          </Container>
        </div>
      );
}

export default Snippet;