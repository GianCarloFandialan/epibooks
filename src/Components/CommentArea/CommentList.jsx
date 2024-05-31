import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";


function CommentList(props) {

  return (
    <>
      <ListGroup>
        <h4>Reviews</h4>
        {props.comments.filter((commentListElement) => (commentListElement.key == props.asin))
        .map((commentListElement) => (

        <SingleComment 
          commentListElement={commentListElement.comment} 
          key={commentListElement.id} 
          deleteReview={props.deleteReview} 
          id={commentListElement.id}
          modifyReview={props.modifyReview}
          asin={props.asin}
          grade={commentListElement.grade}
        />

        
        ))}
      
      </ListGroup>

    </>
  )
}

export default CommentList;