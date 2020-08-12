import React from 'react';

const Annotation = ( {annotation, annotationList} ) => {

    const removeAnnotation = () => {
        console.log(annotation._id)
        
        
    }

    return(
        <li>{annotation.content}<button onClick={() => removeAnnotation()}> x</button></li> //add a button to delete thing
    )
}

export default Annotation;