=============================   2022-06-22  ==============================

1. Router

    - BrowserRouter 이용. url 이 변경 될 때마다 url 을 검사해서 path 에 해당하는 Component 를 render.
    - v6 로 변경되면서 route 안에 element 로 Component 결정
    - 부모가 되는 Route 에 element 가 존재하면, 자식의 element 는 부모 element 의 Component 안에 있는 `Outlet` Component 에 자식 element 의 Component 가 그려진다.
    - 또는 아래의 형태로 path 깊이마다 Component 하나를 render 가능

        ```javascript
            // App.js
            function App() {
                return <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route path="" element={<Home />} />
                            <Route path="login">
                                <Route path="" element={<Login />} />
                                <Route path="test" element={<h1>test</h1>} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            }
        ```

1. Reactive variables

    - apollo client 기능
    - Global 변수를 사용할 수 있도록 도와줌
    - `makeVar`(@apollo/client) 를 이용하여 기본값을 설정 => 리턴 타입이 function 이라 값을 넣어주면 값이 변경된다.
    - `useReactiveVar`(@apollo/client/react) hook 을 이용하여 값의 변경을 감시

    ```javascript
        // apollo.js
        import { makeVar } from "@apollo/client";

        export const isClick = makeVar(false);

        // app.js
        import { useReactiveVar } from "@apollo/client/react";
        import { isClick } from "./apollo";

        function App() {
            const isClick = useReactiveVar(isClick);
            return <div>
                { isClick ? <button onClick={() => isClick(true)}> click !! </button> : null }
            </div>
        }
    ```

1. styled-components

    - react 에서 css 가 적용된 Component 를 쉽게 만들 수 있게 해주는 패키지
    - ThemeProvider 를 이용하여 react App 전체에 쉽게 스타일을 변경할 수 있다.

1. reset css

    - npm i styled-reset
    - styled-components 의 globalstyle 과 혼합하여 reset css 적용

    ```javascript
        // style.js
        import { createGlobalStyle } from "styled-components";
        import { reset } from "styled-reset";

        export const GlobalStyle = createGlobalStyle`
            ${reset}
        `;

        // App.js
        import { GlobalStyle } from "./style.js";

        function App() {
            return <div>
                <GlobalStyle />
            </div>
        }
    ```

=============================   2022-06-20  ==============================

1. react development setting

    - 패키지 설치(router, styled-component, apollo, fontaweasome, helmet, hook-form)
    - npm i styled-components react-hook-form react-helmet-async @apollo/client graphql react-router-dom

    1. fontaweasome 하위 패키지들..
    - npm i --save @fortawesome/fontawesome-svg-core
    - npm install --save @fortawesome/free-solid-svg-icons
    - npm install --save @fortawesome/react-fontawesome
    - npm install --save @fortawesome/free-brands-svg-icons
    - npm install --save @fortawesome/free-regular-svg-icons