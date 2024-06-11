//IMPORTO GLI HOOK DI REACT
import { useContext } from 'react';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Button, Card, Col } from 'react-bootstrap'
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../Context/Darkmode';

function SingleBook( { book, handleSelected, selected, goToBookDetails }) {

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <Col xs={12} md={6} lg={4} xxl={3}>
      {/* I DETTAGLI DELLA CARD SONO IN BASE ALL'OGGETTO BOOK RICEVUTO COME PROP */}
      <Card className={ darkMode ? "bg-black book-cover d-flex flex-column text-white p-3 mb-3 border rounded" : "bg-white book-cover d-flex flex-column p-3 mb-3 border rounded border-black"}>
        {/* AL CLICK DELL'IMMGAGINE VADO A GESTIRE LO STATO DI SELECTED PASSATO COME PROP E COLORO IL BORDO IN BASE AL CONTENUTO DELLO STATO, SE NON COMBACIA CON L'ASIN DEL LIBRO RIMANE ROSSO SE NO DIVENTA VERDE */}
        <Card.Img variant="top" src={book.img} onClick={() => handleSelected(book.asin)} className={book.asin == selected ? "border border-success border-5" : "border border-danger border-5"}/>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
        {/* QUESTO BOTTONE CI REINDERIZZERA VERO LA PAGINE BOOK DETAILS GRAZIE ALLA FUNIONE PASSATA COME PROP IN CUI VADO AD INSERIRE COME PARAMETRO L'ASIN DEL LIBRO */}
        <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => goToBookDetails(book.asin)}>Dettagli</Button>   
      </Card>
    </Col>
  )
}

export default SingleBook;