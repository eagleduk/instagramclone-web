import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CREATE_COMMENT } from "../Apollo/mutations";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`;

const CommentViewRow = styled.div``;
const CommentInputRow = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  padding-left: 5px;
  align-items: center;
  padding: 10px;
  form {
    height: 100%;
  }
`;

function Comments({ feedID, comments }) {
  const { register, handleSubmit } = useForm();
  const [createCommentFN] = useMutation(CREATE_COMMENT);
  const onCommnetSubmit = (data) => {
    if (!data?.comment && data.comment === "") return;
    createCommentFN({
      variables: {
        photoId: feedID,
        text: data?.comment,
      },
    });
  };
  return (
    <CommentsContainer>
      <CommentViewRow>
        {comments?.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </CommentViewRow>
      <CommentInputRow>
        <form onSubmit={handleSubmit(onCommnetSubmit)}>
          <input
            type="text"
            placeholder="댓글 달기..."
            {...register("comment")}
          />
        </form>
      </CommentInputRow>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  feedID: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      photoId: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        avator: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default Comments;
