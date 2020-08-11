import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Modal, ModalBody, 
  ModalHeader, Button, ModalFooter,
  Form, FormGroup, Label, Input 
  } from 'reactstrap';
import Highlightable from "highlightable";
import Highlighter from "react-highlight-words";
import AnnotationModal from './AnnotationModal';

const Snippet = (lessons) => {
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState();
  const [annotationRanges, setAnnotationRanges] = useState();
  const [mouseover, setMouseover] = useState(false);
  const [modal, setModal] = useState(false);
  const [newAnnotationText, setNewAnnotationText] = useState();
  const [newAnnotationContent, setNewAnnotationContent] = useState();

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
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

  const testCallback = () => {
    console.log('hi')
    setMouseover(true)
  }

  const handleMouseUp = () =>{
    if (window.getSelection().toString()){
      setNewAnnotationText(window.getSelection().toString())
      toggleModal()
    }
    //you can use this string to search through the doc and find character places
    //you can have this create a little pop-up modal that allows user to enter an annotation
    //you can handle annotation removal from the annotation text on the sidebar
    //and then you can use the other highlighter addon to just highlight text?
  
  }
  const formatNewAnnotation = (text) => {
    console.log('fiya', newAnnotationText)
    toggleModal()
    console.log(newAnnotationContent)
    createNewAnnotation(newAnnotationContent)
  }

  const createNewAnnotation = (content) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "content":content,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${API_URL}/annotations`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }



  return (
    <div onMouseUp={handleMouseUp}>
      
      {/*would love to refactor this to a new component but having trouble passing props {modal && <AnnotationModal modal={modal} toggle={toggleModal}/>} */}
      <Modal isOpen={modal} toggle={toggleModal} className={"name"}>
            <ModalHeader toggle={toggleModal}>Add annotation</ModalHeader>
            <ModalBody>
               <b>Selected text: </b><br/>
               {newAnnotationText}
            <Form>
              <FormGroup>
                <Input 
                  type="text" 
                  placeholder="Add your annotation here."
                  value={newAnnotationContent}
                  onChange = {e => setNewAnnotationContent(e.target.value)}
                 />
              </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => formatNewAnnotation()}>Add annotation</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
      <Container>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotationRanges &&
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