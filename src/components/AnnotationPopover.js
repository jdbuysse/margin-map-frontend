import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody, Col } from "reactstrap";




const AnnotationPopover = ({annotationPopover, toggleAnnotationPopover, location, content}) => {

    return (
        <div>
          <Button id="Popover1" type="button">
            Launch Popover
          </Button>
          <Popover placement="auto" isOpen={annotationPopover} target="popover" toggle={toggleAnnotationPopover}>
            <PopoverHeader>"{content.corresponding_string}"</PopoverHeader>
            <PopoverBody>{content.content}</PopoverBody>
          </Popover>
        </div>
      );

}


// const AnnotationPopover = () => {
//     //const { id, item } = props;
//     //const [popoverOpen, setPopoverOpen] = useState(false);
  
//     //const toggle = () => setPopoverOpen(!popoverOpen);
  
//     return (
//       <span>
//         <Button
//           className="mr-1"
//           color="secondary"
//           //id={"Popover-" + id}
//           type="button"
//         >
//           {/* {item.text} */}
//         </Button>
//         <Popover
//           //placement={item.placement}
//           //isOpen={popoverOpen}
//           //target={"Popover-" + id}
//           //toggle={toggle}
//         >
//           <PopoverHeader>Popover Title</PopoverHeader>
//           <PopoverBody>
//             Sed posuere consectetur est at lobortis. Aenean eu leo quam.
//             Pellentesque ornare sem lacinia quam venenatis vestibulum.
//           </PopoverBody>
//         </Popover>
//       </span>
//     );
//   };
  

  export default AnnotationPopover;