//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from "react";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Button, ButtonGroup, ListGroupItem, Form, Modal } from "react-bootstrap";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../Context/Darkmode';

function SingleComment( { comment, idCommento, asinCommento, rateCommento, deleteReview, modifyReview } ) {

  //CREO LO STATO PER POTER GESTIRE L'EVENTUALE MODIFICA DEL COMMENTO
  const [modifyComment, setModifyComment] = useState(comment);

  //CREO LO STATO PER GESTIRE QUANDO RENDERE VISIBILE IL MODALE PER LA MDOFIICA
  const [show, setShow] = useState(false);

  //CREO LO STATO PER POTER GESTIRE L'EVENTUALE MODIFICA DELLA VALUTAZIONE
  const [rate, setRate] = useState(rateCommento)

  //CREO LA FUNZIONE PER GESTIRE LA CHIUSURA O APERTURA DEL MODALE IN BASE AL CLICK
  const handleClose = () => setShow(!show);

  //FUNZIONE PER GESTIRE IL CLICK DEL TASTO MODIFICA NEL MODALE PER MDOFICARE
  const handleModifyClick = () => {
    modifyReview(idCommento, modifyComment, asinCommento, rate);
    handleClose();
  }

  //MI "PRENDO" LA DARKMODE  
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      <ListGroupItem className={ darkMode ? "bg-black text-white d-flex justify-content-between align-items-center row g-0 p-0" : "bg-white d-flex justify-content-between align-items-center row g-0 p-0"}>
        <div className="col-6 ps-3">
          <small>{comment}</small>
        </div>

      
        <div className="col-1 p-0">{`${rateCommento}👑`}</div>

        <ButtonGroup className="col-2 p-0 d-flex flex-column">

          <Button variant="danger" onClick={() => deleteReview(idCommento)} className="p-0 mb-2" size="sm">
            ❌
          </Button>

          <Button variant="warning" onClick={handleClose} className="p-0" size="sm">
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