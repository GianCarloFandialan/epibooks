import { useState } from 'react';
import { Card, Col } from 'react-bootstrap'
import CommentArea from './CommentArea/CommentArea';


function SingleBook( { book }) {
  
  const [selected, setSelected] = useState(false)

  function handleClick() {
    setSelected(!selected);
  }

  return (
    <Col xs={12} md={3}>
      <Card className="book-cover d-flex flex-column">
        <Card.Img variant="top" src={book.img} onClick={handleClick} className={selected ? "border border-success border-5" : "border border-danger border-5"}/>
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
        {selected && <CommentArea key={book.asin} asin={book.asin}/>}
      </Card>
    </Col>
  )
}

export default SingleBook;