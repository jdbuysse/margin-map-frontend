import React from 'react';
import '../styles/annotation.css';

const Annotation = ( {annotation, removeAnnotation, annotationHovered} ) => {
    return(
        <div className="annotation-card">
        <li 
            className={annotationHovered === annotation.corresponding_string[0]? "annotation-list-item-hovered" : "annotation-list-item"}   
        >
            {annotation.content} 
        <button className="delete-annotation-button" onClick={() =>removeAnnotation(annotation._id)}>&#9747;</button></li>
        
        </div>
    )
}

export default Annotation;