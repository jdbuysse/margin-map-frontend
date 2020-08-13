import React from 'react';

const Highlight = ( {children, highlightIndex} ) => {

    return(
       <strong className="highlighted-text">{children}</strong>
    )
}

export default Highlight;