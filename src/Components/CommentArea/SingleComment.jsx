//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from "react";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Button, ButtonGroup, ListGroupItem, Form, Modal } from "react-bootstrap";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';

function SingleComment( { comment, idCommento, asinCommento, rateCommento, deleteReview, modifyReview } ) {

  //CREO LO STATO PER POTER GESTIRE L'EVENTUALE MODIFICA DEL COMMENTO
  const [modifyComment, setModifyComment] = useState(comment);

  //CREO LO STATO PER GESTIRE QUANDO RENDERE VISIBILE IL MODALE PER LA MDOFIICA
  const [modifyShow, setModifyShow] = useState(false);

  //CREO LO STATO PER GESTIRE QUANDO RENDERE VISIBILE IL MODALE PER LA CANCELLAZIONE
  const [deleteShow, setDeleteShow] = useState(false);

  //CREO LO STATO PER POTER GESTIRE L'EVENTUALE MODIFICA DELLA VALUTAZIONE
  const [rate, setRate] = useState(rateCommento)

  //CREO LA FUNZIONE PER GESTIRE LA CHIUSURA O APERTURA DEL MODALE DI MODIFICA IN BASE AL CLICK
  const handleCloseModify = () => setModifyShow(!modifyShow);

  //CREO LA FUNZIONE PER GESTIRE LA CHIUSURA O APERTURA DEL MODALE DI CANCELLAZIONE IN BASE AL CLICK
  const handleCloseDelete = () => setDeleteShow(!deleteShow);

  //FUNZIONE PER GESTIRE IL CLICK DEL TASTO MODIFICA NEL MODALE PER MDOFICARE
  const handleModifyClick = () => {
    modifyReview(idCommento, modifyComment, asinCommento, rate);
    handleCloseModify();
  }

  //FUNZIONE PER GESTIRE IL CLICK DEL TASTO MODIFICA NEL MODALE PER MDOFICARE
  const handleDeleteClick = () => {
    deleteReview(idCommento);
    handleCloseDelete();
  }

  //MI "PRENDO" LA DARKMODE  
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      <ListGroupItem className={ darkMode ? "bg-black text-white d-flex justify-content-between align-items-center row g-0 p-0 border book-comment" : "bg-white d-flex justify-content-between align-items-center row g-0 p-0 border-black border book-comment"} data-testid='comment'>
        <div className="col-6 ps-3">
          <small>{comment}</small>
        </div>

      
        <div className="col-1 p-0">{`${rateCommento}👑`}</div>

        <ButtonGroup className="col-2 p-0 d-flex flex-column">

          <Button variant="danger" onClick={handleCloseDelete} className="p-0 mb-2" size="sm">
            ❌
          </Button>

          <Button variant="warning" onClick={handleCloseModify} className="p-0" size="sm">
            ✏ 
          </Button>

        </ButtonGroup>

      </ListGroupItem>

      {/* MODALE PER MDOFICARE IL COMMENTO */}
      <Modal show={modifyShow} onHide={handleCloseModify} >
        <Modal.Header closeButton className={ darkMode ? "bg-black text-white" : "bg-white"} data-bs-theme={ darkMode ? "dark" : ""}>
          <Modal.Title >Modify</Modal.Title>
        </Modal.Header>
        <Modal.Body className={ darkMode ? "bg-black text-white" : "bg-white"}>
          <Form >
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
                className={ darkMode ? "bg-black text-white" : "bg-white"}
              />
            </Form.Group>
            <Form.Label className="fs-5">Rate</Form.Label>
            <Form.Select 
              size="sm" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)}
              className={ darkMode ? "bg-black text-white" : "bg-white"}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer className={ darkMode ? "bg-black text-white" : "bg-white"}>
          <Button variant="secondary" onClick={handleCloseModify}>
            Close
          </Button>
          <Button variant="warning" onClick={handleModifyClick} >
            Modify ✏ 
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODALE PER CANCELLARE IL COMMENTO */}
      <Modal show={deleteShow} onHide={handleCloseDelete} >
        <Modal.Header closeButton className={ darkMode ? "bg-black text-white" : "bg-white"} data-bs-theme={ darkMode ? "dark" : ""}>
          <Modal.Title >Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className={ darkMode ? "bg-black text-white" : "bg-white"}>
          <h3>Press delete to remove the comment</h3>
        </Modal.Body>
        <Modal.Footer className={ darkMode ? "bg-black text-white" : "bg-white"}>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete ❌ 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SingleComment;