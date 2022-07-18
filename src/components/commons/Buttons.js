import styled from "styled-components";

const DefaultButton = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 3px 10px;
  border-radius: 7px;
  cursor: pointer;
`;

const Blue = styled(DefaultButton)`
  background-color: ${(props) => props.theme.normalLinkColor};
  color: white;
`;
const White = styled(DefaultButton)``;

function BlueButton({ onClick = undefined, text }) {
  return <Blue onClick={onClick}>{text}</Blue>;
}

function WhiteButton({ onClick = undefined, text }) {
  return <White onClick={onClick}>{text}</White>;
}

export { BlueButton, WhiteButton };
