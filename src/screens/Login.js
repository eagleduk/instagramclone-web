import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BaseBox = styled.div`
  width: 350px;
  border-width: 1px;
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-color: ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.containerColor};
  padding: 0px 40px;
`;

const Title = styled.h1`
  font-family: "Satisfy", cursive;
  font-size: 44px;
  background-color: inherit;
  margin-top: 40px;
`;

const MainBox = styled(BaseBox)`
  height: 400px;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const SubBox = styled(BaseBox)`
  height: 65px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  gap: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
  gap: 10px;
  background-color: inherit;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.backgroundColor};
  border-color: ${(props) => props.theme.borderColor};
  border-width: 1px;
  border-style: solid;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 3px;
`;

const Submit = styled.input`
  background-color: ${(props) => props.theme.normalLinkColor};
  color: white;
  font-weight: 800;
  margin-top: 10px;
  text-align: center;
  height: 30px;
  border-radius: 5px;
  font-size: 14px;
`;

const Saperator = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    width: 60%;
    text-align: center;
    font-size: 13px;
  }
`;

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
  return (
    <Container>
      <MainBox>
        <Title>Instagram</Title>

        <Form>
          <Input type="text" placeholder="사용자 이름" />
          <Input type="text" placeholder="비밀번호" />
          <Submit type="submit" value="로그인" />
        </Form>

        <Saperator>
          <div></div>
          <span>또는</span>
          <div></div>
        </Saperator>

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
      </MainBox>
      <SubBox>
        <span>계정이 없으신 가요?</span>
        <Link to="signup">가입하기</Link>
      </SubBox>
    </Container>
  );
}

export default Login;
