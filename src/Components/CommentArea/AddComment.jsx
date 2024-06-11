import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Context from '../Context/Prova';


function AddComment(props) {

  const [textareaValue, setTextareaValue] = useState("");

  const [selectValue, setSelectValue] = useState(1);

  const [keyValue, setKeyValue] = useState(props.asin)

  const handleClick = () => {
    props.sendReview(textareaValue, selectValue, keyValue);
    alert(selectValue)
    setSelectValue(1);
    setTextareaValue("");
  }

  const { darkMode } = useContext(Context);

  return (
    <>
      <Form className={ darkMode ? "bg-black text-white fs-5 d-flex flex-column align-items-center" : "bg-white fs-5"}>
        <Form.Label >Comment here</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={textareaValue} 
          onChange={(e) => setTextareaValue(e.target.value)}
        />

        <Form.Select 
          size="sm" 
          className="my-3" 
          value={selectValue} 
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>

        <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={handleClick}>Post</Button>

      </Form>
    </>
  )
}

export default AddComment;