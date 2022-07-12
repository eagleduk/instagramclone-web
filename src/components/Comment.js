import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./commons/Avatar";
import { DefaultLabel, UsernameLabel } from "./commons/Labels";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import useToken from "../hooks/useToken";

const CommentRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 5px;
  margin-bottom: 5px;
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
  const onDeleteComment = (e) => {
    console.log("Delete", id);
  };
  const {
    getTokenUser: { id: loginID },
  } = useToken();
  return (
    <CommentRow>
      <Avatar url={user.avator} scale={0.8} />
      <UsernameLabel>{user.username}</UsernameLabel>
      <DefaultLabel>{text}</DefaultLabel>
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
