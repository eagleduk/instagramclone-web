import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";
import AuthTitle from "../components/commons/AuthTitle";
import BodyContainer from "../components/commons/BodyContainer";
import Saperator from "../components/commons/Saperator";
import { Input, Submit } from "../components/commons/Inputs";
import { Form } from "../components/commons/Forms";
import { MainBox, SubBox } from "../components/commons/AuthBoxs";
import HelmetTitle from "../components/commons/HelmetTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const FacebookLogin = styled.div`
  width: 100%;
  height: 20px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
  span {
    background-color: inherit;
    color: #385185;
    font-size: 14px;
    font-weight: 700;
  }
`;

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      message
      result
    }
  }
`;

function Login() {
  const [LOGIN_FN, { data, loading, error }] = useMutation(LOGIN);

  console.log("data", data, "loading", loading, "error", error);

  const { register, handleSubmit, watch } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    LOGIN_FN({
      variables: data,
    });
  };

  const canSubmit =
    watch("username")?.length > 0 && watch("password")?.length > 5;

  return (
    <BodyContainer>
      <HelmetTitle title="Log in | Instagram clone" />

      <MainBox>
        <AuthTitle />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {})}
            type="text"
            placeholder="사용자 이름"
          />
          <Input
            {...register("password", {})}
            type="text"
            placeholder="비밀번호"
          />
          <Submit
            type="submit"
            value="로그인"
            disabled={canSubmit ? false : true}
          />
        </Form>

        <Saperator text={"또는"} />

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
      </MainBox>

      <SubBox>
        <span>계정이 없으신 가요?</span>
        <Link to={routes.signup}>가입하기</Link>
      </SubBox>
    </BodyContainer>
  );
}

export default Login;
