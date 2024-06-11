import { useContext, useState } from "react";
import { Button, ButtonGroup, ListGroupItem, Form, Modal } from "react-bootstrap";
import Context from '../Context/Prova';

function SingleComment(props) {

  const [modifyComment, setModifyComment] = useState(props.comment);

  const [show, setShow] = useState(false);

  const [rate, setRate] = useState(props.rate)

  const [id, setId] = useState(props.id)

  const [asin, setAsin] = useState(props.asin)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveClick = () => {
    props.deleteReview(id)
  }

  const handleModifyClick = () => {
    props.modifyReview(id, modifyComment, asin, rate);
    handleClose();
  }

  const { darkMode } = useContext(Context);

  return (
    <>
      <ListGroupItem className={ darkMode ? "bg-black text-white d-flex justify-content-between align-items-center row g-0 p-0" : "bg-white d-flex justify-content-between align-items-center row g-0 p-0"}>
        <div className="col-6">
          <small>{props.comment}</small>
        </div>

      
        <div className="col-1 p-0">{`${props.rate}👑`}</div>

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
                value={modifyComment}
                onChange={(e) => setModifyComment(e.target.value)}
              />
            </Form.Group>
            <Form.Label className="fs-5">Rate</Form.Label>
            <Form.Select 
              size="sm" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
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