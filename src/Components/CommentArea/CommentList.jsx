import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";


function CommentList( { comments, deleteReview, modifyReview }) {

  console.log(comments);
  return (
    <>
      <ListGroup>
        <h4>Reviews</h4>
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