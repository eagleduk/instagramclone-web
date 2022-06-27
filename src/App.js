import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import E404 from "./screens/E404";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { isDarkModeVar, isLoginVar } from "./variables";
import { useReactiveVar } from "@apollo/client/react";
import { darkTheme, GlobalStyle, lightTheme } from "./style";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLogin = useReactiveVar(isLoginVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/">
              <Route path="" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<E404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
