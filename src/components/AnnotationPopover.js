import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody} from "reactstrap";

const AnnotationPopover = ({annotationPopover, toggleAnnotationPopover, content}) => {

    return (
        <div>
          <Button id="Popover1" type="button">
            Launch Popover
          </Button>
          <Popover trigger="focus" placement="bottom" isOpen={annotationPopover} target="popover" toggle={toggleAnnotationPopover}>
            <PopoverHeader>"{content.corresponding_string}"</PopoverHeader>
            <PopoverBody>{content.content}</PopoverBody>
          </Popover>
        </div>
      );
}

  export default AnnotationPopover;
