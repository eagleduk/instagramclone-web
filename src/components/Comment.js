import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./commons/Avatar";
import { DefaultLabel, UsernameLabel } from "./commons/Labels";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import useToken from "../hooks/useToken";
import { DELETE_COMMENT } from "../Apollo/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const CommentRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 5px;
  div {
    gap: 5px;
    display: flex;
    align-items: center;
  }
`;

const DelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DelButton = styled.button`
  margin-right: 0px;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

function Comment({ id, text, userId, photoId, user }) {
  const [deleteCommentFN] = useMutation(DELETE_COMMENT);
  const onDeleteComment = (e) => {
    deleteCommentFN({
      variables: {
        deleteCommentId: id,
      },
      update: (cache, data) => {
        const {
          data: {
            deleteComment: { result, error },
          },
        } = data;
        if (result) {
          cache.evict({
            id: `Comment:${id}`,
          });
        } else {
          console.log(error);
        }
      },
    });
  };
  const {
    getTokenUser: { id: loginID },
  } = useToken();
  return (
    <CommentRow>
      <div>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avator} scale={0.8} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <UsernameLabel>{user.username}</UsernameLabel>
        </Link>
        <DefaultLabel>{text}</DefaultLabel>
      </div>
      <DelContainer>
        {loginID === userId ? (
          <DelButton onClick={onDeleteComment}>
            <FontAwesomeIcon icon={faTrashCan} />
          </DelButton>
        ) : null}
      </DelContainer>
    </CommentRow>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  photoId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    avator: PropTypes.string.isRequired,
  }),
};

export default Comment;
