import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 25px;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

function Avatar({ url = "" }) {
  return (
    <StyledAvatar>
      <img src={url} alt="" />
    </StyledAvatar>
  );
}

export default Avatar;
