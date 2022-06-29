import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoginVar = makeVar(false);

export const isDarkModeVar = makeVar(false);

export const ApolloClientConnector = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
