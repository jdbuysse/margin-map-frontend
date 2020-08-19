import React from 'react';
import '../styles/annotation.css';

const Annotation = ( {annotation, removeAnnotation} ) => {


    return(
        <div className="annotation-card">
        <li className="annotation-list-item">{annotation.content} <button className="delete-annotation-button" onClick={() =>removeAnnotation(annotation._id)}>&#9747;</button></li>
        </div>
    )
}

export default Annotation;