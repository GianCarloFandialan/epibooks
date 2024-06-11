//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from "react";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Form, Button } from "react-bootstrap";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../Context/Darkmode';


function AddComment( { sendReview, asin} ) {

  //CREO LO STATO PER IL VALORE DELLA TEXTAREA
  const [textareaValue, setTextareaValue] = useState("");

  //CREO LO STATO PER IL VALORE DEL SELECT
  const [selectValue, setSelectValue] = useState(1);

  //CREO LA FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE PER CREARE UN COMMENTO
  const handleClick = () => {
    sendReview(textareaValue, selectValue, asin);
    setSelectValue(1);
    setTextareaValue("");
  }

  //MI "PRENDO" LA DARKMODE  
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      <Form className={ darkMode ? "bg-black text-white fs-5 d-flex flex-column align-items-center rounded-bottom p-2" : "bg-white fs-5 rounded-bottom p-2 d-flex flex-column align-items-center"}>
        <Form.Label >Comment here</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={textareaValue} 
          onChange={(e) => setTextareaValue(e.target.value)}
          className={ darkMode ? "bg-black text-white border rounded" : "bg-white border rounded border-black"}
        />

        <Form.Select 
          size="sm" 
          className={ darkMode ? "bg-black text-white my-3 border rounded" : "bg-white my-3 border rounded border-black"}
          value={selectValue} 
          onChange={(e) => setSelectValue(e.target.value)}
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