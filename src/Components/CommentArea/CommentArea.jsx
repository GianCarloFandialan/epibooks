import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { Spinner } from 'react-bootstrap';

function CommentArea( { selected } ) {

  const [spinner, setSpinner] = useState(false)

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

  return (
    <div className='p-2'>
      {spinner ??       
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }

      <CommentList 
        comments={comments} 
        deleteReview={deleteReview}
        modifyReview={modifyReview}
        />
      <AddComment 
        sendReview={sendReview} 
        asin={selected}
        className="border border-black"
      />
    </div>
  )
}

export default CommentArea;