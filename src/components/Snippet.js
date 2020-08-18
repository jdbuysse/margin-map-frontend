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
    console.log('cs',annotations)
    let newAnnotationStrings = annotations.map((annotation) => annotation.corresponding_string[0])
    console.log('new annotation strings', newAnnotationStrings)
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
    console.log('cs', newAnnotationText)
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
    let id = getSnippetId()
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
    setNewAnnotationContent()
  }

  const click = (e) => {
    let isMatch = (element) => element === e.target.innerHTML
    if (e.target.className !== ''){
      let index = annotationStrings.findIndex(isMatch)
      setAnnotationPopoverContent(annotations[index])
      toggleAnnotationPopover()
    }
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
        <Button className="hide-annotations-button" onClick={toggleAnnotationsColumn}>Show annotations</Button>
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