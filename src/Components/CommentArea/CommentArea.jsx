//IMPORTO GLI HOOK DI REACT
import { useContext, useEffect, useState } from 'react';
//IMPORTO I VARI COMPONENTI
import CommentList from './CommentList';
import AddComment from './AddComment';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Spinner } from 'react-bootstrap';
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../Context/Darkmode';

function CommentArea( { selected } ) {

  //CREO LO STATO PER LO SPINNER CHE INZIALMENTE è IN FALSE QUINDI NON CI DOVREBBE ESSERE
  const [spinner, setSpinner] = useState(false)

  //CREO LO STATO IN CUI SARANNO CONTENUTI I COMMENTI CHE VADO AD AGGIORNARE AD OGNI CHIAMATA API
  const [comments, setComments] = useState([])

  // GET
  useEffect(() => {

    setSpinner(true);

    const loadComments = (selected) => {
      fetch(`https://striveschool-api.herokuapp.com/api/comments/${selected}`, {
        headers: { 
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTQ4ZmQzMzNiMTAwMTU2OWNkMzQiLCJpYXQiOjE3MTczMzEzMjUsImV4cCI6MTcxODU0MDkyNX0.Y0bjkYMSFIjRTSw3MU4lMOmhX7W3zmspvpQlmdXiyHM"},
      })
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error("Errore nella fetch dei commenti:", error))
        .finally(() => {
          setSpinner(false);
        });
    }
    if (selected) {
      loadComments(selected)
    }

  }, [selected])

  // POST
  const sendReview = (textareaValue, selectValue, keyValue) => {
    if (!textareaValue.trim()) return; 
    setSpinner(true);

    const textarea = textareaValue;
    const select = selectValue;
    const key = keyValue;
    const newComment = { 
      comment: textarea, 
      rate: select, 
      elementId: key
    };

    fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
      method: "POST",
      headers: { 
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTQ4ZmQzMzNiMTAwMTU2OWNkMzQiLCJpYXQiOjE3MTczMzEzMjUsImV4cCI6MTcxODU0MDkyNX0.Y0bjkYMSFIjRTSw3MU4lMOmhX7W3zmspvpQlmdXiyHM",
        "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json()) 
      .then((data) => {
        setComments([...comments, data]);
      })
      .catch((error) =>
        console.error("Errore nella creazione del commento:", error)
      )
      .finally(() => {
        setSpinner(false);
      });
  }

  // DELETE
  const deleteReview = (id) => {
    
    setSpinner(true);

    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTQ4ZmQzMzNiMTAwMTU2OWNkMzQiLCJpYXQiOjE3MTczMzEzMjUsImV4cCI6MTcxODU0MDkyNX0.Y0bjkYMSFIjRTSw3MU4lMOmhX7W3zmspvpQlmdXiyHM"
        }
    })
      .then(() => setComments(comments.filter((comment) => comment._id !== id)))
      .catch((error) => console.error("Errore nella fetch dei commenti:", error))
      .finally(() => {
        setSpinner(false);
      });
  }


  //PUT
  const modifyReview = (id, modifyComment, asin, rate) => {

    setSpinner(true);

    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
      method: "PUT",
      headers: { 
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTQ4ZmQzMzNiMTAwMTU2OWNkMzQiLCJpYXQiOjE3MTczMzEzMjUsImV4cCI6MTcxODU0MDkyNX0.Y0bjkYMSFIjRTSw3MU4lMOmhX7W3zmspvpQlmdXiyHM",
        "Content-Type": "application/json" },
      body: JSON.stringify({ comment: modifyComment, rate: rate, elementId: asin}),
    })
      .then((response) => response.json())
      .then((data) =>
        setComments(
          comments.map((singoloElemento) =>
            singoloElemento._id === id ? data : singoloElemento
          )
        )
      )
      .catch((error) => console.error("Errore nella fetch dei commenti:", error))
      .finally(() => {
        setSpinner(false);
      });
  }

  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE  
  return (
    <div className={darkMode ? 'border rounded m-2' : 'border rounded m-2 border-black'}>
      {/* FACCIO COMPARIRE LO SPINNER SOLO NEL CASO LO STATO SIA SU TRUE */}
      {spinner ??       
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }

      {/* 
      AL COMPOENTE "COMMENTLIST" VADO A PASSARE LE PROPS:
        -LO SATTO COMMENTS, CONTENTE L'ARRAY DEI COMMENTI
        -LA FUNZIONALITA PER CANCELLARE I COMMENTI
        -LA FUNZIOANLITA PER MODIFCARE UN COMMENTO
      */}
      <CommentList 
        comments={comments} 
        deleteReview={deleteReview}
        modifyReview={modifyReview}
      />

      {/*       
        AL COMPOENTE "ADDCOMMENT" VADO A PASSARE LE PROPS:
        -LA FUNZIONE PER AGGIUNGERE IL COMMENTO
        -L'ASIN DEL LIBRO SELEZIONATO, IN MODO TALE DA AGGIUNGERE IL COMMENTO AL LIBRO SPECIFICO
      */}
      <AddComment 
        sendReview={sendReview} 
        asin={selected}
        className="border border-black"
      />
    </div>
  )
}

export default CommentArea;