import styled from "styled-components";

const StyledAvatar = styled.div`
  width: ${(props) => `${props.scale * 25}px`};
  height: ${(props) => `${props.scale * 25}px`};
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

function Avatar({ url = "", scale = 1 }) {
  return (
    <StyledAvatar scale={scale}>
      <img src={url} alt="" />
    </StyledAvatar>
  );
}

export default Avatar;
