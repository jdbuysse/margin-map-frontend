import React from 'react';

const Annotation = ( {annotation, removeAnnotation} ) => {


    return(
        <li>{annotation.content}<button onClick={() =>removeAnnotation(annotation._id)}> x</button></li> //add a button to delete thing
    )
}

export default Annotation;