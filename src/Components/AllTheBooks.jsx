import React, { useState } from "react";
import { Row, Form} from 'react-bootstrap'
import SingleBook from './SingleBook';

function AllTheBooks( { genre }) {
  const [searchInputData, setSearchInputData] = useState("")

  function handleChange(e) {
    const { value } = e.target;
    setSearchInputData(value);
  }

  return (
    <>
      <Form.Control
        type="text"
        name="search"
        placeholder="Search"
        value = {searchInputData}
        onChange={handleChange}
        className="mb-4"
      />

      <Row className="g-2">
        
        {genre.filter((genre) => genre.title.toLowerCase().includes(searchInputData.toLowerCase())).map((book) => {

            return (
              <SingleBook book={book} key={book.asin}/>
            )
            
        })}

      </Row>
    </>
    
  )
} 

export default AllTheBooks;