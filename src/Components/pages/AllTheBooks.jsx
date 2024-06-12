//IMPORTO GLI HOOK DI REACT
import { useContext, useState } from "react";
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Col, Row } from 'react-bootstrap'
//IMPORTO I VARI COMPONENTI
import SingleBook from './SingleBook';
import CommentArea from "../CommentArea/CommentArea";
//IMPORTO GLI HOOK E I COMPONENTI DI REACT ROUTER DOM
import { useNavigate } from "react-router-dom";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';



function AllTheBooks({ searchInputData, genre }) {

  //CREO LO STATO CHE MI GESTIRA IL SELECTED CHE ANDRA A CONTENERE L'ASIN DEL LIBRO SELEZIONATO
  const [selected, setSelected] = useState("")

  //CREO LA FUNZIONE CHE MI ANDRA GESTIRE LO STATO DI SELECTED CHE PASSERO COME PROP
  function handleSelected(asin) {
    setSelected(asin);
  }

  //VADO AD UTILIZZARE LO USENAVIGATE IN MODO TALE DA POTER NAVIGARE NELLA PAGINA "BOOKDETAILS"
  const navigate = useNavigate();

  //CREO UNA FUNZIONE PER GESTIRE LO USE NVAIGATE IN BASE ALL'ASIN DEL LIBRO IN CUI ANDRO A VEDERE I DETTAGLI
  function goToBookDetails(asin) {
    navigate(`/bookdetails/${asin}`)
  }

  const results = genre.filter((genre) => genre.title.toLowerCase().includes(searchInputData.toLowerCase()));

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE
  return (
    <>
      {results.length == 0 ? <p className={darkMode ? " text-center fw-bold my-5 text-white" : "text-center fw-bold my-5"} style={{fontSize:"10vw"}}>No results found</p> : <Row className="g-0">
        <Col xs={8} md={8} >
          <Row>
            {/* FILTRO IL CONTENUTO DEI LIBRI IN BASE A CIO CHE C'è NELLA BARRA DI RICERCA GRAZIE ALLE PROPS RICEVUTE(GENRE E SEARCHINPUTDATA) */}
            {genre.filter((genre) => genre.title.toLowerCase().includes(searchInputData.toLowerCase())).map((book) => {

                {/* 
                  PASSO VARIE PROPS A "SINGLEBOOK": 
                  -L'GGETTO BOOK
                  -USO COME KEY L'ASIN DEL LIBRO CHE DOVREBBE ESSERE UNIVOCO
                  -LA FUNZIONE PER GESTIRE LO STATO SELECTED IN BASE AL CLICK SULLA CARD
                  -SELECTED CHE MI SERVE PER COLORARE IL BORDO DI ROSSO O VERDE IN BASE AL FATTO SE è IL LIBRO SELEZIONATO O NO              
                  -LA FUNZIONALITA DI ANDARE ALLA PAGINE "BOOKDETAILS"
                */}
                return (
                  <SingleBook book={book} key={book.asin} handleSelected={handleSelected} selected={selected} goToBookDetails={goToBookDetails}/>
                )
                
            })}
          </Row>
        </Col>
        <Col xs={4} md={4} className="px-0"> 
          {/* 
            PASSO DUE PROPS AL COMPONENTE COMMENTAREA:
            -PASSO COME KEY L'ASIN 
            -PASSO L'ASIN DEL LIBRO SELEZIONATO
          */}
          <CommentArea key={selected} selected={selected}/>
        </Col>
      </Row>}
      
    </>
  )
} 

export default AllTheBooks;