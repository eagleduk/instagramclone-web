import {} from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../ApolloClient";

function Home() {
  const navigator = useNavigate();
  return (
    <div>
      Welcome!!
      <button
        onClick={() => {
          LogoutUser();
          navigator("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
