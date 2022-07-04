=============================   2022-07-04  ==============================

1. Apollo Client Headers

    - 기존 Apollo Client 객체에는 headers 가 포함되어 있지 않다.
    ```javascript
        export const ApolloClientConnector = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });
    ```
    - cookie 를 사용한 방식이면 API 를 호출할 때 자동으로 cookie 가 포함되어 있지만, Header 방식은 header 에 보내고 싶은 데이터를 포함하여야 한다.  
        [Authentication-Header](https://www.apollographql.com/docs/react/networking/authentication/#header)
    ```javascript
        const httpLink = createHttpLink({
            uri: "http://localhost:4000/graphql",
        });

        const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem(TOKEN_KEY);
        // return the headers to the context so httpLink can read them
            return {
                headers: {
                ...headers,
                token,
                },
            };
        });

        export const ApolloClientConnector = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    ```

1. `버그 처리 필요`
   1. token 을 강제 수정했을 때, 500에러

        - token 을 강제 수정 하고, Apollo client 수행시 500에러 headers token 을 넣었는데 에러가 발생
  
   2. token 및 getTokenUser 시 logout 로직을 수행하는 버그 처리

        - useToken 함수를 수행할 때, token 이 정상일 때에도 결과값이 undefined 가 먼저 출력되는 현상 발생.

=============================   2022-06-30  ==============================

1. React router dom

    - useNavigate hook 을 이용하여 페이지 전환 가능.
    - 또한 state 를 사용하여 데이터 전달 가능.
    ```javascript
        function App() {
            const navigate = useNavigate();
            return <div>
                <button onClick={() => {
                    navigate("/", {
                        state: {
                            data1: "data1",
                            data2: "data2"
                        }
                    })
                }}>
            </div>
        }
    ```

2. Apollo client

    - Apollo server 의 API 를 이용하기 위해서는 각 상황에 맞는 Hook 을 사용 해야 하는듯.
    - Mutation 을 실행 할 때에는 useMutation, Query 를 실행 할 때에는 useQuery 를 사용.
    - Hook 내에서 onComplete, onError 등 다양한 상황에 맞는 데이터 및 함수를 사용할 수 있고,
    - Hook 의 리턴값을 이용하여 onComplete, onError 등 사용이 가능하다.
    ```javascript
        const Mutation = gql``;

        function App() {
            const [onMutation] = useMutation(Mutation, {
                onComplete: (data) => {
                    // 정상 종료시
                },
                onError: (error) => {
                    // 에러 발생시
                }
            });

            onMutation({
                variables: {
                    // Mutation 의 Parameter
                },
                onComplete: (data) => {
                    // 정상 종료시
                },
                onError: (error) => {
                    // 에러 발생시
                }
            })
        }
    ```

=============================   2022-06-29  ==============================

1. Apollo client devtools
   
   - 현재는 정상 동작을 하지 않는 듯.
   - 그래도 apollo client 는 정상 동작을 한다.
   - mutation, query 는 backend 서버를 보며 확인해야 할듯
   - Apollo client 를 사용하기 위해 ApolloProvider 로 React Component 를 감싸주어야 한다.

2. React Hook Form

    - 버전 6 에서는 register 값을 React Component 의 ref 값에 할당을 했다면, 버전 7 에서는 register 값을 React Component 에 attribute 로 할당을 해야 한다.
    ```javascript
        function App() {
            const { register } = useForm();

            return <div>
                { /* version 6  */}
                <input ref={register} name="version6" />

                { /* version 7 */ }
                <input {...register("version7")}>
            </div>
        }
    ```
    - useForm 의 watch 값을 이용하여 실시간 값의 변화를 감지 할 수있다.
    ```javascript
        function App() {
            const { register, watch } = useForm();

            console.log(watch("name"));
            console.log(watch(["name","id"]));

            return <div>
                <input {...register("name")}>
                <input {...register("id")}>
            </div>
        }
    ```


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

2. Reactive variables

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

3. styled-components

    - react 에서 css 가 적용된 Component 를 쉽게 만들 수 있게 해주는 패키지
    - ThemeProvider 를 이용하여 react App 전체에 쉽게 스타일을 변경할 수 있다.

4. reset css

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