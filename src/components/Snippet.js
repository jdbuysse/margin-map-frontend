import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, ModalBody, 
  ModalHeader, Button, ModalFooter,
  Form, FormGroup, Input 
  } from 'reactstrap';
import Highlighter from "react-highlight-words";
import Annotation from './Annotation';

const Snippet = (lessons) => {
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState();
  const [annotationRanges, setAnnotationRanges] = useState();
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

  const handleMouseUp = () =>{
    if (window.getSelection().toString()){
      setNewAnnotationText(window.getSelection().toString())
      toggleModal()
    }
  }

  const createNewAnnotation = (content) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "content":content,
    });

    let requestOptions = {
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

  const formatNewAnnotation = () => {
    toggleModal()
    createNewAnnotation(newAnnotationContent)
    patchNewAnnotation()
  }

  const patchNewAnnotation = () => {
    getSnippetAndAnnotations()
      .then(([snippet, notes]) => {
        console.log(snippet, notes)
        getAnnotationIDs(notes)
      })
  }

  const getAnnotationIDs = (notes) => {
    let IDs = notes.map((annotation) => annotation._id)
    console.log(IDs)
    patchAnnotationsToSnippet(IDs)
  }

  const patchAnnotationsToSnippet = (idArray) => {
    let id = lessons.lessons[0]._id
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"annotations":idArray});
    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${API_URL}/snippets/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const getSnippetById = (id) => {
    return fetch(`${API_URL}/snippets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
  };

  const getAnnotations = () => {
    return fetch(`${API_URL}/annotations/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
  };

  const getSnippetAndAnnotations = () => {
    return Promise.all([getSnippetById(lessons.lessons[0]._id), getAnnotations()])
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
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotations && annotations.map((annotation, index) => ( 
              <Annotation annotation={annotation} key={index} />
            ))}
          </Col>
        </Row>
        <Col>
            <div onMouseUp={handleMouseUp}>asdf</div>
        </Col>
      </Container>
    </div>
  );
}

export default Snippet;