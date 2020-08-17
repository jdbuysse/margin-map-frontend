import React, { useEffect, useState, useRouteMatch} from 'react';
import '../styles/snippet.css';
import { Container, Row, Col, Button} from 'reactstrap';
import Highlighter from "react-highlight-words";
import Annotation from './Annotation';
import AnnotationModal from './AnnotationModal';
import AnnotationPopover from './AnnotationPopover'

const Snippet = (lessons, routerProps) => {
  
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState(false);
  const [annotationStrings, setAnnotationStrings] = useState('');
  const [modal, setModal] = useState(false);
  const [annotationsColumn, setAnnotationsColumn] = useState(false);
  const [newAnnotationText, setNewAnnotationText] = useState();
  const [newAnnotationContent, setNewAnnotationContent] = useState();
  const [annotationPopover, setAnnotationPopover] = useState(false);
  const [annotationPopoverLocation, setAnnotationPopoverLocation] = useState();
  const [annotationPopoverContent, setAnnotationPopoverContent] = useState();

  const toggleModal = () => setModal(!modal);
  const toggleAnnotationsColumn = () => setAnnotationsColumn(!annotationsColumn)
  const toggleAnnotationPopover = () => setAnnotationPopover(!annotationPopover)

  const removeAnnotation = (removedAnnotationID) => {
    deleteAnnotation(removedAnnotationID)
    const newArray = annotations.filter(annotation => !(annotation._id === removedAnnotationID));
    setAnnotations(newArray);
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

  useEffect(() => {
    let hi = getSnippetId()
    console.log(hi)
    let id = lessons.lessons[0]._id
    fetch(`${API_URL}/snippets/${id}`)
      .then(response => response.json())
      .then(data => {
        setAnnotations(data.annotations)
        createAnnotationTargetStrings(data.annotations)
      })
  }, [lessons])

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
    let newAnnotationStrings = annotations.map((annotation) => annotation.corresponding_string)
    setAnnotationStrings(newAnnotationStrings)
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

    fetch(`${API_URL}/annotations`, requestOptions)
      .then(response => response.text())
      .then(result => console.log('new object',result))
      .catch(error => console.log('error', error));
  }

  const formatNewAnnotation = () => {
    toggleModal()
    createNewAnnotation(newAnnotationContent)
    patchNewAnnotation()
  }

  const patchNewAnnotation = () => {
    getSnippetAndAnnotations()
      .then(([notes]) => {
        getAnnotationIDs(notes)
      })
  }

  const getAnnotationIDs = (notes) => {
    return notes.map((annotation) => annotation._id) 
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

  const getAnnotations = () => {
    return fetch(`${API_URL}/annotations/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
  };

  const getSnippetAndAnnotations = () => {
    return Promise.all([getAnnotations()])
  }

  const promiseAddAnnotation = () => {
    return Promise.all([createNewAnnotation(newAnnotationContent)])
  }

  const promiseGetAnnotations = () => {
    return Promise.all([getAnnotations()])
  }

  const addNewAnnotationToHook = (object) => {
    let newArray = [...annotations, object]
    setAnnotations(newArray)
  }

  const newAnnotationHandler = () => {
    toggleModal()
    promiseAddAnnotation(newAnnotationContent)
    promiseGetAnnotations()
    getSnippetAndAnnotations()
      .then(([notes]) => {
        addNewAnnotationToHook(notes[0])
        let IDs = getAnnotationIDs(notes)
        patchAnnotationsToSnippet(IDs)
    })
    createAnnotationTargetStrings(annotations)
  }

  const click = (e) => {
    let isMatch = (element) => element === e.target.innerHTML
    if (e.target.className !== ''){
      let index = annotationStrings.findIndex(isMatch)
      setAnnotationPopoverContent(annotations[index])
      setAnnotationPopoverLocation(e.target.firstChild)
      console.log(e.target.firstChild)
      toggleAnnotationPopover()
    }
  }

  return (
    
    <div onMouseUp={handleMouseUp}>
        
        {annotationPopoverContent && <AnnotationPopover annotationPopover={annotationPopover} location={annotationPopoverLocation} content={annotationPopoverContent}/>}
        <AnnotationModal 
          modal={modal} toggleModal={toggleModal} formatNewAnnotation={formatNewAnnotation}
          setNewAnnotationContent={setNewAnnotationContent} newAnnotationContent={newAnnotationContent}
          newAnnotationText={newAnnotationText} newAnnotationHandler={newAnnotationHandler}
        />

      <Container>
      <Col sm={{ size: 6, order: 2, offset: 6 }}>
        <Button className="hide-annotations-button" onClick={toggleAnnotationsColumn}>Show annotations</Button>
        <div id='popover'> 
        </div>
      </Col>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotations &&
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={annotationStrings ? annotationStrings : [""]}
                autoEscape={true}
                textToHighlight={lessons && lessons.lessons[0].body}
                //activeIndex={0}
                onClick={click}
                //activeClassName="active-highlighted-text"
              />
            }
            </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            
            {annotationsColumn && annotations && annotations.map((annotation, index) => ( 
              <Annotation annotation={annotation} key={index} removeAnnotation={removeAnnotation} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Snippet;