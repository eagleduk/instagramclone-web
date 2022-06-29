import styled from "styled-components";

export const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border-color: ${(props) => props.theme.borderColor};
  border-width: 1px;
  border-style: solid;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 3px;
`;

export const Submit = styled.input`
  background-color: ${(props) => props.theme.normalLinkColor};
  color: white;
  font-weight: 800;
  margin-top: 10px;
  text-align: center;
  height: 30px;
  border-radius: 5px;
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;
