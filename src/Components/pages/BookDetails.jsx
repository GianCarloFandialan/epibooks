//IMPORTO GLI HOOK E I COMPONENTI DI REACT ROUTER DOM
import { useParams } from "react-router-dom";
//IMPORTO I VARI FILE JSON CONTENTI I GENERI ED I LORO LIBRI
import history from "../../data/history.json";
import romance from "../../data/romance.json";
import fantasy from "../../data/fantasy.json";
import scifi from "../../data/scifi.json";
import horror from "../../data/horror.json";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Col, Row } from "react-bootstrap";
//IMPORTO I VARI COMPONENTI
import CommentArea from "../CommentArea/CommentArea";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';
//IMPORTO GLI HOOK DI REACT
import { useContext } from "react";


function BookDetails() {
  //RICAVO L'ASIN CHE E STATO USATO COME PARAMETRO
  const { asin } = useParams();

  //UNISCO TUTTI I JSON DEI GENERI IN UNO UNICO IN MODO TALE DA POTER AVERE IL DETTAGLIO DI OGNI SINGOLO LIBRO IN PAGINA
  const allTheBooks = history.concat(romance).concat(fantasy).concat(scifi).concat(horror);

  //RICAVO IL LIBRO DI CUI STO CERCANDO I DETTAGLI FILTRANDO L'ARRAY RICAVATO PRECEDENTEMENTE
  const libro = allTheBooks.find((book) => book.asin == parseInt(asin))

  //MI "PRENDO" LA DARKMODE  
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      <Row className=" py-5 g-0">
        <Col md={4} className="d-flex justify-content-center">
          <img src={libro.img} alt="immagine libro" className="w-50"/>
        </Col>
        <Col md={7} className={ darkMode ? "d-flex flex-column justify-content-center align-items-baseline border border-start-0 border-3" : "d-flex flex-column justify-content-center align-items-baseline border border-start-0 border-3 border-dark-subtle"}>
          <h2 className={ darkMode ? "text-white" : "bg-secondary-subtle"}>{libro.title}</h2>
          <h4 className={ darkMode ? "text-white" : "bg-secondary-subtle"}>Genre: {libro.category}</h4>
          <h6 className={ darkMode ? "text-white" : "bg-secondary-subtle"}>Price: {libro.price}$</h6>
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