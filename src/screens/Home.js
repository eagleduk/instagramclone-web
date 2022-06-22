import { isLoginVar } from "../variables";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoginVar(false)}>Login</button>
    </div>
  );
}

export default Home;
