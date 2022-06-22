import { isLoginVar } from "../variables";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoginVar(true)}> logout </button>
    </div>
  );
}

export default Login;
