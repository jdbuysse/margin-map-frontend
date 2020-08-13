import React, { useEffect, useState} from 'react';
import '../styles/snippet.css';
import { Container, Row, Col} from 'reactstrap';
import Highlighter from "react-highlight-words";
import Annotation from './Annotation';
import AnnotationModal from './AnnotationModal';

const Snippet = (lessons) => {
  const API_URL = 'http://localhost:5000'

  const [annotations, setAnnotations] = useState();
  const [annotationRanges, setAnnotationRanges] = useState();
  const [annotationStrings, setAnnotationStrings] = useState();
  const [modal, setModal] = useState(false);
  const [newAnnotationText, setNewAnnotationText] = useState();
  const [newAnnotationContent, setNewAnnotationContent] = useState();
  
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

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    let id = lessons.lessons[0]._id
    fetch(`${API_URL}/snippets/${id}`)
      .then(response => response.json())
      .then(data => {
        setAnnotations(data.annotations)
        handleAnnotationRangeFormatting(data.annotations)
      })
  }, [lessons, annotations])

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

  const createAnnotationTargetStrings = () => {
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
        getAnnotationIDs(notes)
      })
    createAnnotationTargetStrings()
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
      
        <AnnotationModal 
          modal={modal} toggleModal={toggleModal} formatNewAnnotation={formatNewAnnotation}
          setNewAnnotationContent={setNewAnnotationContent} newAnnotationContent={newAnnotationContent}
          newAnnotationText={newAnnotationText}
        />
      <Container>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotationRanges &&
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={annotationStrings ? annotationStrings : [""]}
                autoEscape={true}
                textToHighlight={lessons && lessons.lessons[0].body}
                onMouseUp={handleMouseUp}
              />
            }
          </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            {annotations && annotations.map((annotation, index) => ( 
              <Annotation annotation={annotation} key={index} removeAnnotation={removeAnnotation} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Snippet;