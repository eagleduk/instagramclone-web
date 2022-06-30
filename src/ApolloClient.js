import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN_KEY = "TOKEN";
const THEME_KEY = "THEME";

export const isLoginVar = makeVar(Boolean(localStorage.getItem(TOKEN_KEY)));

export const LoginUser = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  isLoginVar(true);
};

export const LogoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  isLoginVar(false);
};

export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(THEME_KEY)));

export const setDarkMode = () => {
  localStorage.setItem(THEME_KEY, THEME_KEY);
  isDarkModeVar(true);
};

export const setLightMode = () => {
  localStorage.removeItem(THEME_KEY);
  isDarkModeVar(false);
};

export const ApolloClientConnector = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
