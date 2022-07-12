import styled from "styled-components";
import { DefaultLabel, UsernameLabel } from "./commons/Labels";
import PropTypes from "prop-types";

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 05px;
  align-items: center;
`;

const CaptionRow = styled(FooterRow)`
  margin: 5px 0px 15px 5px;
  justify-content: flex-start;
  gap: 5px;
`;

const REGEXR = /(#[\w]+)|([\w]+)/g;

function Caption({ url, name, caption }) {
  return (
    <CaptionRow>
      <UsernameLabel>{name}</UsernameLabel>
      <DefaultLabel>{caption}</DefaultLabel>
    </CaptionRow>
  );
}

Caption.prototype = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Caption;
