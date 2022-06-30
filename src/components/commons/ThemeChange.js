import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { isDarkModeVar, setDarkMode, setLightMode } from "../../ApolloClient";

const Container = styled.div``;

const Range = styled.input``;

function ThemeChange() {
  const isDarkMode = useReactiveVar(isDarkModeVar);
  const [value, setValue] = useState(isDarkMode ? 1 : 0);
  const setTheme = (event) => {
    const {
      target: { valueAsNumber: theme },
    } = event;
    setValue(theme);
    theme === 1 ? setDarkMode() : setLightMode();
  };
  return (
    <Container>
      <Range type="range" min="0" max="1" value={value} onChange={setTheme} />
    </Container>
  );
}

export default ThemeChange;
