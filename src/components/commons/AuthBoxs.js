import styled from "styled-components";

export const BaseBox = styled.div`
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

export const MainBox = styled(BaseBox)`
  height: ${(props) => props.height};
  justify-content: flex-start;
  margin-bottom: 10px;
  padding-bottom: 20px;
`;

export const SubBox = styled(BaseBox)`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  gap: 5px;
  padding: 20px 0;
  a {
    color: ${(props) => props.theme.normalLinkColor};
  }
`;
