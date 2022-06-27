import { Link } from "react-router-dom";
import { MainBox, SubBox } from "../components/commons/AuthBoxs";
import AuthTitle from "../components/commons/AuthTitle";
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

function SignUp() {
  return (
    <BodyContainer>
      <HelmetTitle title="Sign up | Instagram clone"></HelmetTitle>
      <MainBox>
        <AuthTitle />

        {/* 
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} color="white" />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>

        <Saperator text={"또는"} /> 
        */}

        <Form>
          <Input type="text" placeholder="이메일 주소" />
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="사용자 이름" />
          <Input type="text" placeholder="비밀번호" />
          <Submit type="submit" value="가입" />
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
