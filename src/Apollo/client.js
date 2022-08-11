import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instagram-clone-eagleduk.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(TOKEN_KEY);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? token : "",
    },
  };
});

export const ApolloClientConnector = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
