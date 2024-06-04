import React, { useContext, useState } from "react";
import { Row } from 'react-bootstrap'
import SingleBook from './SingleBook';
import Context from "./Context/Prova";

function AllTheBooks({ searchInputData, genre }) {

  const { darkMode } = useContext(Context);

  return (
    <>


      <Row className={ darkMode ? "bg-dark g-2" : "bg-white g-2"}>
        
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