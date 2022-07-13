import styled from "styled-components";
import { DefaultLabel, HashTagsLabel, UsernameLabel } from "./commons/Labels";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

const REGEXR =
  /(#[\w]+[!@$%^&*()_+{}[\];':",.<>/?`~\\|]*)|([\w]+[!@$%^&*()_+{}[\];':",.<>/?`~\\|]*)/g;

function Caption({ url, name, caption }) {
  return (
    <CaptionRow>
      <UsernameLabel>{name}</UsernameLabel>
      {caption
        .split(REGEXR)
        .filter((t) => t?.trim() && true)
        .map((t, index) => {
          return t?.startsWith("#") ? (
            <Link to={`/hashtags/${t}`} key={index}>
              {" "}
              <HashTagsLabel>{t}</HashTagsLabel>{" "}
            </Link>
          ) : (
            <DefaultLabel key={index}>{t}</DefaultLabel>
          );
        })}
    </CaptionRow>
  );
}

Caption.prototype = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Caption;
