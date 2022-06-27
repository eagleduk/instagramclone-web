import styled from "styled-components";

const StyledTitle = styled.h1`
  font-family: "Satisfy", cursive;
  font-size: 44px;
  background-color: inherit;
  margin: 40px 0;
`;

function AuthTitle() {
  return <StyledTitle>Instagram</StyledTitle>;
}

export default AuthTitle;
