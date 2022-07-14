import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        border-color: ${(props) => props.theme.borderColor};
        box-sizing: border-box;
    }
    body {
        color: ${(props) => props.theme.color};
        background-color: ${(props) => props.theme.backgroundColor};
        font-family: 'Open Sans', sans-serif;
    }
    input {
        all:unset;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const lightTheme = {
  backgroundColor: "rgba(250, 250, 250, 1)",
  color: "rgba(0,55,107,1)",
  borderColor: "rgba(219, 219, 219,1)",
  containerColor: "rgba(255, 255, 255,1)",
  normalLinkColor: "rgba(0,149,246,1)",
};
export const darkTheme = {
  color: "rgba(250, 250, 250, 1)",
  backgroundColor: "rgba(0,55,107,1)",
  borderColor: "rgba(219, 219, 219,1)",
  containerColor: "rgba(255, 255, 255,1)",
  normalLinkColor: "rgba(0,149,246,1)",
};
