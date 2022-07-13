import styled from "styled-components";

export const DefaultLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.color};
  text-overflow: ellipsis;
`;

export const HashTagsLabel = styled(DefaultLabel)`
  display: block;
  color: ${(props) => props.theme.normalLinkColor};
  cursor: pointer;
`;

export const AccentLabel = styled(DefaultLabel)`
  font-weight: 600;
`;

export const UsernameLabel = styled(AccentLabel)`
  display: block;
  cursor: pointer;
`;
