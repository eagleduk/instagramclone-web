import styled from "styled-components";
import PropTypes from "prop-types";

const StyledComponent = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    width: 60%;
    text-align: center;
    font-size: 13px;
  }
`;

function Saperator({ text }) {
  return (
    <StyledComponent>
      <div></div>
      <span>{text}</span>
      <div></div>
    </StyledComponent>
  );
}

Saperator.propTypes = {
  text: PropTypes.string,
};

export default Saperator;
