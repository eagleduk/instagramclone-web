import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoginVar } from "../Apollo/client";
import { TOKENUSER } from "../Apollo/queries";

function useToken() {
  const hasToken = useReactiveVar(isLoginVar);
  const { data } = useQuery(TOKENUSER, {
    skip: !hasToken,
    //onCompleted: (data) => console.log("completed", data),
    //onError: () => console.log("error"),
  });

  useEffect(() => {
    if (data?.getTokenUser === undefined) {
      //LogoutUser();
    }
  }, [data]);
  return data;
}

export default useToken;
