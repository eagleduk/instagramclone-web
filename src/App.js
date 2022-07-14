import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import E404 from "./screens/E404";
import Home from "./screens/Home";
import { ApolloProvider, useReactiveVar } from "@apollo/client/react";
import { darkTheme, GlobalStyle, lightTheme } from "./style";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";
import {
  ApolloClientConnector,
  isDarkModeVar,
  isLoginVar,
} from "./Apollo/client";
import Login from "./screens/Login";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

function App() {
  const isLogin = useReactiveVar(isLoginVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <ApolloProvider client={ApolloClientConnector}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="/">
                <Route
                  path=""
                  element={
                    isLogin ? (
                      <Layout>
                        <Home />
                      </Layout>
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="users">
                  <Route
                    path=":username"
                    element={
                      <Layout>
                        <Profile />
                      </Layout>
                    }
                  />
                </Route>
              </Route>
              <Route path="*" element={<E404 />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
