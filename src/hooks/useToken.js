import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoginVar, LogoutUser } from "../ApolloClient";

const TOKENUSER = gql`
  query GetTokenUser {
    getTokenUser {
      id
      avator
      username
      firstname
      lastname
      email
    }
  }
`;

function useToken() {
  const hasToken = useReactiveVar(isLoginVar);
  const { data } = useQuery(TOKENUSER, {
    skip: !hasToken,
    onCompleted: (data) => console.log("completed", data),
    onError: () => console.log("error"),
  });
  console.log(data);
  useEffect(() => {
    if (data?.getTokenUser === undefined) {
      console.log("logout");
      //LogoutUser();
    }
  }, [data]);
  return data;
}

export default useToken;
