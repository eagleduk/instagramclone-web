import styled from "styled-components";

const StyledTitle = styled.h1`
  font-family: "Satisfy", cursive;
  font-size: ${(props) => props.fontSize};
  background-color: inherit;
  margin: 40px 0;
`;

function Logo({ fontSize = "44px" }) {
  return <StyledTitle fontSize={fontSize}>Dukstagram</StyledTitle>;
}

export default Logo;
