import React, { useContext, useState } from "react";
import { Col, Row } from 'react-bootstrap'
import SingleBook from './SingleBook';
import Context from "../Context/Prova";
import CommentArea from "../CommentArea/CommentArea";
import { useNavigate } from "react-router-dom";

function AllTheBooks({ searchInputData, genre }) {

  const { darkMode } = useContext(Context);

  const [selected, setSelected] = useState("")

  function handleSelected(asin) {
    setSelected(asin);
  }

  const navigate = useNavigate();

  function goToBookDetails(asin) {
    navigate(`/${asin}`)
  }


  return (
    <>
      <Row className="g-0">
        <Col xs={12} md={8} >
          <Row>
            {genre.filter((genre) => genre.title.toLowerCase().includes(searchInputData.toLowerCase())).map((book) => {

                return (
                  <SingleBook book={book} key={book.asin} handleSelected={handleSelected} selected={selected} goToBookDetails={goToBookDetails}/>
                )
                
            })}
          </Row>
        </Col>
        <Col xs={12} md={4} className="px-0"> 
          <CommentArea key={selected} selected={selected}/>
        </Col>
      </Row>
    </>
  )
} 

export default AllTheBooks;