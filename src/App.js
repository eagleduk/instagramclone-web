import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import E404 from "./screens/E404";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { isDarkModeVar, isLoginVar } from "./variables";
import { useReactiveVar } from "@apollo/client/react";
import { darkTheme, GlobalStyle, lightTheme } from "./style";

function App() {
  const isLogin = useReactiveVar(isLoginVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/">
            <Route path="" element={isLogin ? <Home /> : <Login />} />
          </Route>
          <Route path="*" element={<E404 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
