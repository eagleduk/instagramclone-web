import { useParams } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  min-width: 935px;
  margin-top: 30px;
  padding: 10px 20px 0px 20px;
`;

function Profile() {
  const { username } = useParams();
  return (
    <Main>
      <ProfileContainer>{username}</ProfileContainer>
    </Main>
  );
}

export default Profile;
