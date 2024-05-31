import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Spinner } from 'react-bootstrap';

function CommentArea(props) {

  const [spinner, setSpinner] = useState(false)

  const [comments, setComments] = useState([])

  useEffect(() => {

    setSpinner(true);

    fetch("http://localhost:5000/cooments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Errore nella fetch dei commenti:", error))
      .finally(() => {
        setSpinner(false);
      });
  },[])

  const sendReview = (textareaValue, selectValue, keyValue) => {
    if (!textareaValue.trim()) return; 
    setSpinner(true);

    const textarea = textareaValue;
    const select = selectValue;
    const key = keyValue;
    const newComment = { comment: textarea, grade: select, key: key};

    fetch("http://localhost:5000/cooments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json()) 
      .then((data) => {
        setComments([...comments, data]);
        console.log(comments);
      })
      .catch((error) =>
        console.error("Errore nella creazione del commento:", error)
      )
      .finally(() => {
        setSpinner(false);
      });
  }

  const deleteReview = (id) => {
    
    setSpinner(true);

    fetch(`http://localhost:5000/cooments/${id}`, {
      method: "DELETE",
    })
      .then(() => setComments(comments.filter((comment) => comment.id !== id)))
      .catch((error) => console.error("Errore nella fetch dei commenti:", error))
      .finally(() => {
        setSpinner(false);
      });
  }

  const modifyReview = (id, modifyValue, asin, grade) => {

    setSpinner(true);

    fetch(`http://localhost:5000/cooments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: modifyValue, grade: grade, key: asin}),
    })
      .then((response) => response.json())
      .then((data) =>
        setComments(
          comments.map((singoloElemento) =>
            singoloElemento.id === id ? data : singoloElemento
          )
        )
      )
      .catch((error) => console.error("Errore nella fetch dei commenti:", error))
      .finally(() => {
        setSpinner(false);
      });
  }

  return (
    <>
      {spinner ??       
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }

      <CommentList 
        comments={comments} 
        key={props.asin} 
        asin={props.asin}    
        deleteReview={deleteReview}
        modifyReview={modifyReview}
        />
      <AddComment 
        sendReview={sendReview} 
        asin={props.asin}
        className="border border-black"
      />
    </>
  )
}

export default CommentArea;