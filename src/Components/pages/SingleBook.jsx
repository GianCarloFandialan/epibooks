import { useContext, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap'
import CommentArea from '../CommentArea/CommentArea';
import Context from '../Context/Prova';


function SingleBook( { book, handleSelected, selected, goToBookDetails }) {
  
  const { darkMode } = useContext(Context);

  function handleClick() {
    handleSelected(book.asin);
  }

  return (
    <Col xs={12} md={6} lg={4} xxl={3}>
      <Card className={ darkMode ? "bg-black book-cover d-flex flex-column text-white p-3 mb-3 border rounded" : "bg-white book-cover d-flex flex-column p-3 mb-3 border rounded border-black"}>
        <Card.Img variant="top" src={book.img} onClick={() => handleClick()} className={book.asin == selected ? "border border-success border-5" : "border border-danger border-5"}/>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
        <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={() => goToBookDetails(book.asin)}>Dettagli</Button>   
      </Card>
    </Col>
  )
}

export default SingleBook;