import { useReactiveVar } from "@apollo/client";
import { isLoginVar } from "../ApolloClient";
import Login from "./Login";

function Home() {
  const isLogin = useReactiveVar(isLoginVar);
  return <>{isLogin ? null : <Login />}</>;
}

export default Home;
