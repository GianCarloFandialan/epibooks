import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";
import { useContext } from "react";
import Context from '../Context/Prova';


function CommentList( { comments, deleteReview, modifyReview }) {

  const { darkMode } = useContext(Context);

  return (
    <>
      <ListGroup className={ darkMode ? "bg-black text-white rounded-top p-2" : "bg-white rounded-top p-2"}>
        <h4 className="text-center">Reviews</h4>
          {comments.map(comment => 
            
            <SingleComment
              key={comment._id} 
              comment={comment.comment} 
              id = {comment._id}
              asin = {comment.elementId}
              rate = {comment.rate}
              deleteReview={deleteReview} 
              modifyReview={modifyReview}
            />
          )}     
      </ListGroup>

    </>
  )
}

export default CommentList;