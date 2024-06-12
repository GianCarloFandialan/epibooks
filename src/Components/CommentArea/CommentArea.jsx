//IMPORTO GLI HOOK DI REACT
import { useContext, useEffect, useState } from 'react';
//IMPORTO I VARI COMPONENTI
import CommentList from './CommentList';
import AddComment from './AddComment';
//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { Spinner } from 'react-bootstrap';
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';
import axios from '../modules/ApiAxios'

function CommentArea( { selected } ) {

  //CREO LO STATO PER LO SPINNER CHE INZIALMENTE è IN FALSE QUINDI NON CI DOVREBBE ESSERE
  const [spinner, setSpinner] = useState(false)

  //CREO LO STATO IN CUI SARANNO CONTENUTI I COMMENTI CHE VADO AD AGGIORNARE AD OGNI CHIAMATA API
  const [comments, setComments] = useState([])

  // GET
  useEffect(() => {

    setSpinner(true);

    if (selected) {
      axios.get(selected)
        .then(response => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("Errore nella creazione del commento:", error)
          alert("Errore nel caricamento dei commenti")
        })
        .finally(() => {
          setSpinner(false);
        })
    }

  }, [selected])

  // POST
  const sendReview = (comment, rate, asin) => {

    if (!comment.trim()) return; 

    setSpinner(true);

    axios.post('', {
      comment: comment, 
      rate: rate, 
      elementId: asin
    })
      .then(response => {
        setComments([...comments, response.data]);
        alert("Comment added")
      })
      .catch((error) => {
        console.error("Errore nella creazione del commento:", error)
        alert("Errore nella creazione del commento")
      })
      .finally(() => {
        setSpinner(false);
      })
  }

  // DELETE
  const deleteReview = (id) => {
    
    setSpinner(true);

    axios.delete(id)
      .then(response => {
        setComments(comments.filter((comment) => comment._id !== id));
        alert("Comment Deleted")
      })
      .catch((error) => {
        console.error("Errore nella fetch dei commenti:", error); 
        alert("Error")
      })
      .finally(() => {
        setSpinner(false);
      })
  }

  //PUT
  const modifyReview = (id, modifyComment, asin, rate) => {

    setSpinner(true);

    axios.put(id, {
      comment: modifyComment, 
      rate: rate, 
      elementId: asin
    })
      .then(response => {
        setComments(comments.map((singoloCommento) => singoloCommento._id === id ? response.data : singoloCommento));
        alert("Comment Modified")
      })
      .catch((error) => {
        console.error("Errore nella modifica del commento:", error)
        alert("Errore nella modifica del commento")
      })
      .finally(() => {
        setSpinner(false);
      })
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