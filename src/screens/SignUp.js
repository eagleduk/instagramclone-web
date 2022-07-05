import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MainBox, SubBox } from "../components/commons/AuthBoxs";
import Logo from "../components/commons/AuthTitle";
import BodyContainer from "../components/commons/BodyContainer";
import { Form } from "../components/commons/Forms";
import HelmetTitle from "../components/commons/HelmetTitle";
import { Input, Submit } from "../components/commons/Inputs";
import routes from "../routes";

/*
import styled from "styled-components";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Saperator from "../components/commons/Saperator";
const FacebookLogin = styled.div`
  width: 100%;
  height: 30px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  background-color: ${(props) => props.theme.normalLinkColor};
  border-radius: 5px;
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
  span {
    background-color: inherit;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
`;
*/

const CREATEUSER = gql`
  mutation CreateUser(
    $firstname: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      firstname: $firstname
      username: $username
      password: $password
      email: $email
    ) {
      id
    }
  }
`;

function SignUp() {
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
  const [CREATEUSER_FN] = useMutation(CREATEUSER);
  const onCompleteCreateUser = (data) => {
    navigator("/", { replace: true, state: "Created." });
  };

  const onErrorCreateUser = (data) => {
    console.log(data);
  };

  const onSubmit = (values) => {
    CREATEUSER_FN({
      variables: values,
      onCompleted: onCompleteCreateUser,
      onError: onErrorCreateUser,
    });
  };
  const canSubmit =
    watch("username")?.length > 0 && watch("password")?.length > 5;

  return (
    <BodyContainer>
      <HelmetTitle title="Sign up | Dukstagram"></HelmetTitle>
      <MainBox>
        <Logo />

        {/* 
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} color="white" />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>

        <Saperator text={"또는"} /> 
        */}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {})}
            type="text"
            placeholder="이메일 주소"
          />
          <Input
            {...register("firstname", {})}
            type="text"
            placeholder="이름"
          />
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
            value="가입"
            disabled={canSubmit ? false : true}
          />
        </Form>
      </MainBox>

      <SubBox>
        <span>계정이 있으신 가요?</span>
        <Link to={routes.home}>로그인</Link>
      </SubBox>
    </BodyContainer>
  );
}

export default SignUp;
