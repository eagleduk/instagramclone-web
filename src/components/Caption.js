import styled from "styled-components";
import Avatar from "./commons/Avatar";
import { AccentLabel, DefaultLabel } from "./commons/Labels";
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

function Caption({ url, name, caption }) {
  return (
    <CaptionRow>
      <Avatar url={url} scale={0.8} />
      <AccentLabel>{name}</AccentLabel>
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
