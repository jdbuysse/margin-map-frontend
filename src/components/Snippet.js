import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Highlightable from "highlightable";
import Highlighter from "react-highlight-words";

const Snippet = (lessons) => {
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState();
  const [annotationRanges, setAnnotationRanges] = useState();
  const [mouseover, setMouseover] = useState(false);

  useEffect(() => {
    lessons === null ? console.log('not loaded') : console.log('loaded', lessons.lessons[0]._id)
    let id = lessons.lessons[0]._id
    fetch(`${API_URL}/snippets/${id}`)
      .then(response => response.json())
      .then(data => {
        setAnnotations(data.annotations)
        handleAnnotationRangeFormatting(data.annotations)
      })
  }, [lessons])

  const handleAnnotationRangeFormatting = (data) => {
    //map annotation data into 'ranges' array of objects
    const thing = [];
    data.forEach((entry) => {
      thing.push({
        text: entry.content,
        start: entry.corresponding_range[0],
        end: entry.corresponding_range[1],
        data: entry
      })
    })
    setAnnotationRanges(thing)
  }

  // useEffect(() => {
  //   console.log('mouse')
  // }, [mouseover])

  const customRenderer =(currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord)=> {
    console.log('custom render')
  }

  const testCallback = () => {
    console.log('hi')
    setMouseover(true)
  }

  const handleMouseUp = () =>{
    console.log(`selected: ${window.getSelection().toString()}`)
    //you can use this string to search through the doc and find character places
    //you can have this create a little pop-up modal that allows user to enter an annotation
    //you can handle annotation removal from the annotation text on the sidebar
    //and then you can use the other highlighter addon to just highlight text?
  }

  return (
    <div onMouseUp={handleMouseUp}>

      <Container>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotationRanges &&
              // <Highlightable
              //   ranges={annotationRanges}
              //   enabled={true}
              //   //id={'a'}
              //   rangeRenderer = {customRenderer()}
              //   onMouseOverHighlightedWord = {() => testCallback()}
              //   //onMouseOverHighlightedWord = {() => setMouseover(true)}
              //   highlightStyle={{
              //     backgroundColor: '#ffcc80'
              //   }}
              //   text={lessons && lessons.lessons[0].body}
              // />
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={["and", "or", "the"]}
                autoEscape={true}
                textToHighlight={lessons && lessons.lessons[0].body}
                onMouseUp={handleMouseUp}
              />
            }
          </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}><li>{annotations && annotations[0].content}</li><li>{annotations && annotations[1].content}</li></Col>
        </Row>
        <Col>
            <div onMouseUp={handleMouseUp}>asdf</div>
        </Col>
      </Container>
    </div>
  );
}

export default Snippet;