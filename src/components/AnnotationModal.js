import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter,
Form, FormGroup, Input} from 'reactstrap';

const AnnotationModal = ({modal, toggleModal, newAnnotationText, 
    setNewAnnotationContent, formatNewAnnotation, newAnnotationContent}) => {
    return (
        <Modal isOpen={modal} toggle={toggleModal} className={"name"}>
        <ModalHeader toggle={toggleModal}>Add annotation</ModalHeader>
        <ModalBody>
           <b>Selected text: </b><br/>
           {newAnnotationText}
        <Form>
          <FormGroup>
            <Input 
              type="text" 
              placeholder="Add your annotation here."
              value={newAnnotationContent}
              onChange = {e => setNewAnnotationContent(e.target.value)}
             />
          </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => formatNewAnnotation()}>Add annotation</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
    </Modal>
    )

}

export default AnnotationModal;