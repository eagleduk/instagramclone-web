import styled from "styled-components";
import Logo from "./AuthTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import useToken from "../../hooks/useToken";
import { Link } from "react-router-dom";
import { LogoutUser } from "../../Apollo/client";
import routes from "../../routes";

const StyledHeader = styled.header`
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: center;
  padding: 0 30px;
`;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.normalLinkColor};
  color: ${(props) => props.theme.containerColor};
  border: none;
  font-weight: 600;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginButton = styled(Button)``;

const SignUpButton = styled(Button)`
  color: ${(props) => props.theme.normalLinkColor};
  background-color: ${(props) => props.theme.containerColor};
`;

function Header() {
  const tokenUser = useToken();
  return (
    <StyledHeader>
      <StyledContainer>
        <StyledHeaderColumn>
          <Logo fontSize="30px" />
        </StyledHeaderColumn>
        <StyledHeaderColumn>
          {tokenUser?.getTokenUser ? (
            <>
              <Link to={routes.home}>
                <FontAwesomeIcon icon={faHouse} size="lg" />
              </Link>
              <Link to={`/users/${tokenUser?.getTokenUser?.username}`}>
                <Avatar url={tokenUser?.getTokenUser?.avator} />
              </Link>
              <button onClick={() => LogoutUser()}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to={routes.login}>
                <LoginButton> 로그인 </LoginButton>
              </Link>
              <Link to={routes.signup}>
                <SignUpButton> 가입하기 </SignUpButton>
              </Link>
            </>
          )}
        </StyledHeaderColumn>
      </StyledContainer>
    </StyledHeader>
  );
}

export default Header;
