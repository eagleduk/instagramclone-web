import styled from "styled-components";

const Error = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: center;
`;

const Message = styled.span`
  color: red;
`;

function ErrorMessage({ message }) {
  console.log(message);
  return <Error>{message ? <Message>{message}</Message> : null}</Error>;
}

export default ErrorMessage;
