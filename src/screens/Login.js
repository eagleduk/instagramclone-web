import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";
import Logo from "../components/commons/AuthTitle";
import BodyContainer from "../components/commons/BodyContainer";
import Saperator from "../components/commons/Saperator";
import { Input, Submit } from "../components/commons/Inputs";
import { Form } from "../components/commons/Forms";
import { MainBox, SubBox } from "../components/commons/AuthBoxs";
import HelmetTitle from "../components/commons/HelmetTitle";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LoginUser } from "../Apollo/client";
import ErrorMessage from "../components/commons/ErrorMessage";
import ThemeChange from "../components/commons/ThemeChange";
import { LOGIN } from "../Apollo/mutations";

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

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const navigator = useNavigate();
  const [LOGIN_FN] = useMutation(LOGIN);

  const onCompletedLogin = (data) => {
    const {
      login: { message, result, token },
    } = data;
    if (result) {
      // token 저장
      LoginUser(token);
      navigator("/", { replace: true });
    } else {
      // error message display
      setError("login", { message });
    }
  };

  const onSubmit = (values) => {
    LOGIN_FN({
      variables: values,
      onCompleted: onCompletedLogin,
    });
  };

  const canSubmit =
    watch("username")?.length > 0 && watch("password")?.length > 5;

  return (
    <BodyContainer>
      <ThemeChange></ThemeChange>
      <HelmetTitle title="Log in | Dukstagram" />

      <MainBox>
        <Logo />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {})}
            type="text"
            placeholder="사용자 이름"
          />
          <Input
            {...register("password", {})}
            type="password"
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

        <ErrorMessage message={errors?.login?.message} />
      </MainBox>

      <SubBox>
        <span>계정이 없으신 가요?</span>
        <Link to={routes.signup}>가입하기</Link>
      </SubBox>
    </BodyContainer>
  );
}

export default Login;
