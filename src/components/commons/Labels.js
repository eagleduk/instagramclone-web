import styled from "styled-components";

export const DefaultLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.color};
`;

export const HashTagLabel = styled(DefaultLabel)`
  display: block;
  cursor: pointer;
`;

export const AccentLabel = styled(DefaultLabel)`
  font-weight: 600;
`;

export const UsernameLabel = styled(AccentLabel)`
  display: block;
  cursor: pointer;
`;
