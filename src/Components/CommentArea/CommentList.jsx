//IMPORTO ALCUNI COMPONENTI DI BOOTSTRAP
import { ListGroup } from "react-bootstrap";
//IMPORTO I VARI COMPONENTI
import SingleComment from "./SingleComment";
//IMPORTO GLI HOOK DI REACT
import { useContext } from "react";
//IMPORTO IL CONTEXT PER POTERLO UTILIZZARE
import Context from '../modules/Darkmode';


function CommentList( { comments, deleteReview, modifyReview }) {
  
  //MI "PRENDO" LA DARKMODE
  const { darkMode } = useContext(Context);

  //STILIZZO IN BASE ALLA DARKMODE  
  return (
    <>
      <ListGroup className={ darkMode ? "bg-black text-white rounded-top p-2" : "bg-white rounded-top p-2"}>
        <h4 className="text-center">Reviews</h4>

        {/* 
          DENTO AL COMPONTENTE "SINGLECOMMENT" VADO A PASSARE LE PROPS:
          -PASSO COME KEY L'ID DEL COMMENTO
          -PASSO IL COMMENTO DEL SINGOLO COMMENTO
          -L'ID DEL COMMENTO
          -L'ASIN DEL LIBRO A CUI SI RIFERISCE IL COMMENTO
          -LA FUNZIONALITA PER CANCELLARE IL COMMENTO
          -LA FUNZIONALITA PER MODIFICARE IL COMMENTO
        */}
        {comments.map(comment => 
          
          <SingleComment
            key={comment._id} 
            comment={comment.comment} 
            idCommento = {comment._id}
            asinCommento = {comment.elementId}
            rateCommento = {comment.rate}
            deleteReview={deleteReview} 
            modifyReview={modifyReview}
          />

        )}     
      </ListGroup>

    </>
  )
}

export default CommentList;