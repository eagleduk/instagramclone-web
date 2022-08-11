=============================   2022-08-11  ==============================
#### Deploy
1. Netlify signup for github
2. select repository
3. production mode
    - node 에서는 env 에 기본적으로 "development", "production" 의 mode 에 대한 값이 입력되어 있다.
    - process.env.NODE_ENV 을 이용하여 deploy 시에는 자동으로 production mode 로 활성화 되어 있다.
    - 해당 값을 이용하여 graphql 의 주소를 변경할 수 있다.
4. _redirects
    - Netlify 에 deploy 이후 refresh 버그 발생
    - public 폴더에 `_redirects` 생성 이후 주소에 파일을 맵핑 해준다.

    ```
        /   /index.html 200
    ```

=============================   2022-07-18  ==============================

1. Bug fix.
   1. Feed like / unlik bug fix.

=============================   2022-07-18  ==============================

1. User Profile
   1. Profile Component Update
   2. following / unfollowing Update

2. ToDo
   1. User Profile Layout
   2. Home like / unlike bug

=============================   2022-07-13  ==============================

1. Link 연결
   1. User Profile link 생성

2. ToDo
   1. User Profile

=============================   2022-07-13  ==============================

1. hashtag 정규식을 이용한 분기 및 link Component 적용
2. comment 등록시 자동 추가
3. comment 삭제 작업
4. useMutation
   1. onCompleted: 결과 값에 대한 data 만 arg 로 받을 수 있다.
   2. update: 결과값과 cache 를 arg 로 받을 수 있다.

        - cache 수정(`modify`) 및 삭제(`evict`)를 할떄 유용하다.

5. TODO
   1. like 버그 => 다른 사람의 like 등록된 feed 에 대하여 like 클릭시 버그 발생
   1. fragment를 사용하지 않고 cache 에 객체 추가가 가능한지?

=============================   2022-07-12  ==============================

1. 폴더 구조 변경
    - apollo client, mutation, query, fragment 를 하나의 폴더에 작성

2. comment 작업

    - commentView, commentInput 을 가지고 있는 comments Component 생성
    - commentRow 를 가지고 있는 comment Component 생성
    - comment create 로직 추가

3. backend comment 에 user 정보 추가
4. backend feed 에 comment 갯수가 아닌 comment 배열로 변경

5. TODO
   1. hashtag link 
   2. comment 추가 / 삭제 로직

=============================   2022-07-11  ==============================

1. feed comment 작업
2. Apollo Cache modify

    - fragment 를 사용하지 않고 [modify(수정)](https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachemodify), [evict(삭제)](https://www.apollographql.com/docs/react/caching/garbage-collection#cacheevict) 가 가능하다.


=============================   2022-07-07  ==============================

1. backend 에서 로그인 유저에 대한 feed like / unlike 추가
2. Apollo client fragment 를 이용한 Apollo cache 데이터 읽기 / 쓰기

=============================   2022-07-06  ==============================

1. Home / Feed 화면 분할
2. [Apollo Client Cache Read/Write](https://www.apollographql.com/docs/react/caching/cache-interaction/)
3. backend 에서 로그인 유저가 feed에 대한 like 여부 리턴 값이 없음.

=============================   2022-07-05  ==============================

1. Home 화면 작업

2. [Apollo Client Fragments](https://www.apollographql.com/docs/react/data/fragments/)

    - Apollo client 에서 query 를 수행하고 cache 에 저장된 결과를 읽거나 쓸수 있는 기능.  


=============================   2022-07-04  ==============================

1. [Apollo Client Headers](https://www.apollographql.com/docs/react/networking/authentication/#header)

    - 기존 Apollo Client 객체에는 headers 가 포함되어 있지 않다.
    ```javascript
        export const ApolloClientConnector = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });
    ```
    - cookie 를 사용한 방식이면 API 를 호출할 때 자동으로 cookie 가 포함되어 있지만, Header 방식은 header 에 보내고 싶은 데이터를 포함하여야 한다.  
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

2. `버그 처리`
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