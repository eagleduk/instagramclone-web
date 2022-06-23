import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        color: ${(props) => props.theme.color};
        border-color: ${(props) => props.theme.borderColor};
        box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.backgroundColor};
        font-family: 'Open Sans', sans-serif;
    }
    input {
        all:unset;
    }
    a {
        text-decoration: none;
    }
`;

export const lightTheme = {
  backgroundColor: "#FAFAFA",
  color: "rgba(0,55,107,1)",
  borderColor: "rgb(219, 219, 219)",
  containerColor: "rgb(255, 255, 255)",
  normalLinkColor: "rgba(0,149,246,1)",
};
export const darkTheme = {
  backgroundColor: "#FAFAFA",
  color: "rgba(0,55,107,1)",
  borderColor: "rgb(219, 219, 219)",
  containerColor: "rgb(255, 255, 255)",
  normalLinkColor: "rgba(0,149,246,1)",
};
