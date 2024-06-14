//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from "react";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Form, Button } from "react-bootstrap";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';


function AddComment( { sendReview, asin} ) {

  //CREO LO STATO PER IL VALORE DELLA TEXTAREA
  const [comment, setComment] = useState("");

  //CREO LO STATO PER IL VALORE DEL SELECT
  const [rate, setRate] = useState(1);

  //CREO LA FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE PER CREARE UN COMMENTO
  const handleClick = () => {
    sendReview(comment, rate, asin);
    setRate(1);
    setComment("");
  }

  //MI "PRENDO" LA DARKMODE  
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      <Form className={ darkMode ? "bg-black text-white fs-5 d-flex flex-column align-items-center rounded-bottom p-2" : "bg-secondary-subtle fs-5 rounded-bottom p-2 d-flex flex-column align-items-center"}>
        <Form.Label >Comment here</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={comment} 
          onChange={(e) => setComment(e.target.value)}
          className={ darkMode ? "bg-black text-white border rounded" : "bg-white border rounded border-black"}
        />

        <Form.Label className="mt-3">Rate here</Form.Label>
        <Form.Select 
          size="sm" 
          className={ darkMode ? "bg-black text-white mb-3 border rounded" : "bg-white mb-3 border rounded border-black"}
          value={rate} 
          onChange={(e) => setRate(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>

        <Button variant={darkMode ? "outline-light mb-3" : "outline-dark mb-3"} onClick={handleClick}>Post</Button>

      </Form>
    </>
  )
}

export default AddComment;