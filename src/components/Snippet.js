import React, { useEffect, useState} from 'react';
import '../styles/snippet.css';
import { Container, Row, Col, Button} from 'reactstrap';
import Highlighter from "react-highlight-words";
import Annotation from './Annotation';
import AnnotationModal from './AnnotationModal';
import AnnotationPopover from './AnnotationPopover'

const Snippet = (lessons) => {
  
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState(false);
  const [snippet, setSnippet] = useState();
  const [annotationStrings, setAnnotationStrings] = useState('');
  const [modal, setModal] = useState(false);
  const [annotationsColumn, setAnnotationsColumn] = useState(false);
  const [newAnnotationText, setNewAnnotationText] = useState();
  const [newAnnotationContent, setNewAnnotationContent] = useState();
  const [annotationPopover, setAnnotationPopover] = useState(false);
  const [annotationPopoverContent, setAnnotationPopoverContent] = useState();
  const [annotationIDs, setAnnotationIDs] = useState();
  const [snippetID, setSnippetID] = useState();
  const [annotationHovered, setAnnotationHovered] = useState();

  const toggleModal = () => setModal(!modal);
  const toggleAnnotationsColumn = () => setAnnotationsColumn(!annotationsColumn)
  const toggleAnnotationPopover = () => setAnnotationPopover(!annotationPopover)

  const removeAnnotation = (removedAnnotationID) => {
    deleteAnnotation(removedAnnotationID)
    const newArray = annotations.filter(annotation => !(annotation._id === removedAnnotationID));
    setAnnotations(newArray);
  }

  useEffect(() => {
    let id = getSnippetId()
    fetch(`${API_URL}/snippets/${id}`)
      .then(response => response.json())
      .then(data => {
        setSnippet(data.body)
        setAnnotations(data.annotations)
        setAnnotationIDs(data.annotations.map((annotation) => annotation._id))
        setSnippetID(id)
      })
  }, [lessons, annotationIDs])

  useEffect(() => {
    if (annotations){
      createAnnotationTargetStrings(annotations)
    }
  }, [annotations])

  const getSnippetId = () => {
    let arr = window.location.href.split('/')
    return arr.slice().pop()
  }

  const createAnnotationTargetStrings = (annotations) => {
    let newAnnotationStrings = annotations.map((annotation) => annotation.corresponding_string[0])
    setAnnotationStrings(newAnnotationStrings)
  }

  const deleteAnnotation = (id) => {
    var raw = "";
    var requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };
    fetch(`http://localhost:5000/annotations/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
      "corresponding_string": newAnnotationText
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    return fetch(`${API_URL}/annotations`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }

  const addNewAnnotationId = (result) => {
    let newArray = [...annotationIDs, result]
    setAnnotationIDs(newArray)
  }

  const formatNewAnnotation = () => {
    toggleModal()
    createNewAnnotation(newAnnotationContent)
  }

  const patchAnnotationsToSnippet = (idArray) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({"annotations":idArray});
    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${API_URL}/snippets/${snippetID}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const promiseAddAnnotation = () => {
    return Promise.all([createNewAnnotation(newAnnotationContent)])
  }

  const newAnnotationHandler = () => {
    toggleModal()
    promiseAddAnnotation(newAnnotationContent)
      .then(([prom]) => {
        let patchArr = [...annotationIDs, prom._id]
        //patch id into snippet annotation array
        patchAnnotationsToSnippet(patchArr)
        //update state with new ID
        addNewAnnotationId(prom._id)
      })
    setNewAnnotationContent() //empty 'new annotation' state
  }

  const click = (e) => {
    let isMatch = (element) => element === e.target.innerHTML
    if (e.target.className !== ''){
      let index = annotationStrings.findIndex(isMatch)
      setAnnotationPopoverContent(annotations[index])
      toggleAnnotationPopover()
    }
  }

  const annotationHover = (e) => {
    if (e.target.className !== ''){ //and class name is not empty
      setAnnotationHovered(e.target.textContent)
    }
  }

  const clearHover = () => {
    setAnnotationHovered()
  }

  return (
    <div onMouseUp={handleMouseUp}>
        {annotationPopoverContent && <AnnotationPopover annotationPopover={annotationPopover} content={annotationPopoverContent}/>}
        <AnnotationModal 
          modal={modal} toggleModal={toggleModal} formatNewAnnotation={formatNewAnnotation}
          setNewAnnotationContent={setNewAnnotationContent} newAnnotationContent={newAnnotationContent}
          newAnnotationText={newAnnotationText} newAnnotationHandler={newAnnotationHandler}
        />
      <Container>
      <Col sm={{ size: 6, order: 2, offset: 6 }}>
        <Button className="hide-annotations-button" onClick={toggleAnnotationsColumn}>Show all annotations</Button>
        <div id='popover' className='popover-modal'> 
        </div>
      </Col>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotations &&
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={annotationStrings ? annotationStrings : [""]}
                autoEscape={true}
                textToHighlight={snippet && snippet}
                onClick={click}
                onMouseOver={annotationHover}
                onMouseLeave={clearHover}
              />
            }
            </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>            
            {annotationsColumn && annotations && annotations.map((annotation, index) => ( 
              <Annotation annotation={annotation} key={index} removeAnnotation={removeAnnotation} annotationHovered={annotationHovered} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Snippet;