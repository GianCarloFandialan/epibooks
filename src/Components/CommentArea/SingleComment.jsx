import { useState } from "react";
import { Button, ButtonGroup, ListGroupItem, Form, Modal } from "react-bootstrap";

function SingleComment(props) {

  const [id, setID] = useState(props.id);

  const [modifyValue, setModifyValue] = useState(props.commentListElement);

  const [show, setShow] = useState(false);

  const [asin, setAsin] = useState(props.asin)

  const [grade, setGrade] = useState(props.grade)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveClick = () => {
    props.deleteReview(id)
  }

  const handleModifyClick = () => {
    props.modifyReview(id, modifyValue, asin, grade);
    handleClose();
  }

  return (
    <>
      <ListGroupItem className="d-flex justify-content-between align-items-center row g-0 p-0">
        <div className="col-6">
          <small>{props.commentListElement}</small>
        </div>

      
        <div className="col-1 p-0">{`${props.grade}👑`}</div>

        <ButtonGroup className="col-2 p-0 d-flex flex-column">

          <Button variant="danger" onClick={handleRemoveClick} className="p-0 mb-2" size="sm">
            ❌
          </Button>

          <Button variant="warning" onClick={handleShow} className="p-0" size="sm">
            ✏ 
          </Button>

        </ButtonGroup>

      </ListGroupItem>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Modify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fs-5">Comment</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={modifyValue}
                onChange={(e) => setModifyValue(e.target.value)}
              />
            </Form.Group>
            <Form.Label className="fs-5">Grade</Form.Label>
            <Form.Select 
              size="sm" 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)}
            >
              <option>1👑</option>
              <option>2👑</option>
              <option>3👑</option>
              <option>4👑</option>
              <option>5👑</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleModifyClick}>
            Modifica ✏ 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SingleComment;