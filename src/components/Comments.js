import PropTypes from "prop-types";
import styled from "styled-components";

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 05px;
  align-items: center;
`;

const CommentRow = styled(FooterRow)`
  margin: 5px 0px 15px 5px;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

function Comments() {
  return (
    <CommentRow>
      <input type="text" placeholder="댓글 달기..." />
    </CommentRow>
  );
}

Comments.propTypes = {};

export default Comments;
