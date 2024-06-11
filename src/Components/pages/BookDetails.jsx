import { useParams } from "react-router-dom";
import history from "../../data/history.json";
import romance from "../../data/romance.json";
import fantasy from "../../data/fantasy.json";
import scifi from "../../data/scifi.json";
import horror from "../../data/horror.json";
import { Col, Row } from "react-bootstrap";
import CommentArea from "../CommentArea/CommentArea";
import Context from '../Context/Prova';
import { useContext } from "react";


function BookDetails() {
  const { asin } = useParams();

  const allTheBooks = history.concat(romance).concat(fantasy).concat(scifi).concat(horror);

  const libro = allTheBooks.find((book) => book.asin == parseInt(asin))

  const { darkMode } = useContext(Context);

  return (
    <>
      <Row className=" py-5 g-0">
        <Col md={4} className="d-flex justify-content-center">
          <img src={libro.img} alt="immagine libro" className="w-50"/>
        </Col>
        <Col md={7} className="d-flex flex-column justify-content-center align-items-baseline border border-start-0 border-3">
          <h2 className={ darkMode ? "text-white" : "bg-white"}>{libro.title}</h2>
          <h4 className={ darkMode ? "text-white" : "bg-white"}>Genre: {libro.category}</h4>
          <h6 className={ darkMode ? "text-white" : "bg-white"}>Price: {libro.price}$</h6>
        </Col>
      </Row>
      <div className="container-fluid d-flex justify-content-center pt-5">
        <div className="w-75 border border-secondary-subtle border-3 p-3">
          <CommentArea selected={asin} className="w-75"/>
        </div>
      </div>

      
    </>
  )
}

export default BookDetails;