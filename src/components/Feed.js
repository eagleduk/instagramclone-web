import styled from "styled-components";
import Avatar from "../components/commons/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartUnLike,
  faMessage,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartLike } from "@fortawesome/free-solid-svg-icons";
import { AccentLabel, UsernameLabel } from "../components/commons/Labels";
import PropTypes from "prop-types";
import { ApolloClientConnector } from "../Apollo/client";
import { useMutation } from "@apollo/client";
import Caption from "./Caption";
import Comments from "./Comments";
import { TOGGLE_LIKE } from "../Apollo/mutations";
import { viewPhotoFragment } from "../Apollo/fragments";

const FeedContainer = styled.div`
  max-width: 470px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  margin-top: 20px;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
`;

const FeedContent = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  img {
    width: 100%;
  }
`;

const FeedFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 05px;
  align-items: center;
`;

const IconRow = styled(FooterRow)`
  div {
    display: flex;
  }
  span {
    display: flex;
    width: 40px;
    height: 40px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 24px;
    color: ${(props) => {
      return props.isLike ? "red" : "rgba(38, 38, 38, 1)";
    }};
  }
  span:hover {
    svg {
      color: rgba(38, 38, 38, 0.6);
    }
  }
`;

const LikeRow = styled(FooterRow)`
  margin: 5px 0px 15px 5px;
`;

function Feed({
  id,
  createdAt,
  caption,
  file,
  user,
  isOwner,
  comments,
  like,
  isLike,
}) {
  const fragmentVar = {
    id: `Photo:${id}`,
    fragment: viewPhotoFragment,
  };

  const { like: cacheLike, isLike: cacheIsLike } =
    ApolloClientConnector.readFragment(fragmentVar);

  const [TOGGLE_LIKE_FN] = useMutation(TOGGLE_LIKE);
  const onToggleLike = (e) => {
    TOGGLE_LIKE_FN({
      variables: {
        id,
      },
      onCompleted: (data) => {
        ApolloClientConnector.writeFragment({
          ...fragmentVar,
          data: {
            isLike: !cacheLike,
            like: cacheLike ? cacheIsLike - 1 : cacheIsLike + 1,
          },
        });
      },
    });
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <Avatar url={user.avator} scale={1.3} />
        <UsernameLabel>{user.username}</UsernameLabel>
      </FeedHeader>
      <FeedContent>
        <img src={file} alt={caption} />
      </FeedContent>
      <FeedFooter>
        <IconRow>
          <div>
            <span onClick={onToggleLike}>
              <FontAwesomeIcon
                icon={isLike ? faHeartLike : faHeartUnLike}
                style={{ color: isLike ? "tomato" : "inherit" }}
              />
            </span>
            <span>
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faBookmark} />
            </span>
          </div>
        </IconRow>

        {like === 0 ? null : (
          <LikeRow>
            <AccentLabel>{like === 1 ? "1 like" : `${like} likes`}</AccentLabel>
          </LikeRow>
        )}

        <Caption url={user.avator} name={user.username} caption={caption} />

        <Comments feedID={id} comments={comments} />
      </FeedFooter>
    </FeedContainer>
  );
}

Feed.propTypes = {
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    avator: PropTypes.string.isRequired,
  }),
  isOwner: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      photoId: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        avator: PropTypes.string.isRequired,
      }),
    })
  ),
  like: PropTypes.number.isRequired,
  isLike: PropTypes.bool.isRequired,
};

export default Feed;
