import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GETUSER } from "../Apollo/queries";
import { useQuery, useMutation } from "@apollo/client";
import Avatar from "./commons/Avatar";
import { DefaultLabel16, ProfileUsername } from "./commons/Labels";
import { BlueButton, WhiteButton } from "./commons/Buttons";
import { FOLLOWUSER, UNFOLLOWUSER } from "../Apollo/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";

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

const UserProfile = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-bottom: 60px;
`;

const UserAvatar = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  flex-grow: 2;
  div {
    margin-bottom: 25px;
  }
`;

const InfoUsername = styled.div`
  display: flex;
`;

const UserAction = styled.div``;

const InfoStatus = styled.div`
  ul {
    display: flex;
    li {
      margin-right: 40px;
    }
  }
`;

const InfoCaption = styled.div``;

const UserFeeds = styled.div`
  padding-top: 30px;
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const FeedInfo = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const UserFeed = styled.div`
  width: 100%;
  height: 300px;
  background-image: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  :hover ${FeedInfo} {
    display: flex;
  }
`;

function Profile() {
  const { username } = useParams();
  const { data } = useQuery(GETUSER, {
    variables: {
      username,
    },
  });

  const [unFollowFN] = useMutation(UNFOLLOWUSER);
  const [followFN] = useMutation(FOLLOWUSER);

  const unFollowAction = () => {
    unFollowFN({
      variables: {
        username: data?.getUserProfile?.username,
      },
      update: (
        cache,
        {
          data: {
            unFollowingUser: { result, message },
          },
        }
      ) => {
        if (result) {
          cache.modify({
            id: `User:${data?.getUserProfile?.id}`,
            fields: {
              followerCount(prev) {
                return prev - 1;
              },
              isFollowing(prev) {
                return !prev;
              },
            },
          });
        }
      },
    });
  };

  const followActioin = () => {
    followFN({
      variables: {
        username: data?.getUserProfile?.username,
      },
      update: (
        cache,
        {
          data: {
            followingUser: { result, message },
          },
        }
      ) => {
        if (result) {
          cache.modify({
            id: `User:${data?.getUserProfile?.id}`,
            fields: {
              followerCount(prev) {
                return prev + 1;
              },
              isFollowing(prev) {
                return !prev;
              },
            },
          });
        }
      },
    });
  };

  return (
    <Main>
      <ProfileContainer>
        <UserProfile>
          <UserAvatar>
            <Avatar url={data?.getUserProfile?.avator} scale={6} />
          </UserAvatar>
          <UserInfo>
            <InfoUsername>
              <ProfileUsername>
                {data?.getUserProfile?.username}
              </ProfileUsername>
              <UserAction>
                {data?.getUserProfile?.isOwner ? (
                  <WhiteButton text="프로필 편집" />
                ) : data?.getUserProfile?.isFollowing ? (
                  <BlueButton text="unfollow" onClick={unFollowAction} />
                ) : (
                  <WhiteButton text="follow" onClick={followActioin} />
                )}
              </UserAction>
            </InfoUsername>
            <InfoStatus>
              <ul>
                <li>
                  <DefaultLabel16>
                    게시물 {data?.getUserProfile?.photo?.length}
                  </DefaultLabel16>
                </li>
                <li>
                  <DefaultLabel16>
                    팔로워 {data?.getUserProfile?.followerCount}
                  </DefaultLabel16>
                </li>
                <li>
                  <DefaultLabel16>
                    팔로우 {data?.getUserProfile?.followingCount}
                  </DefaultLabel16>
                </li>
              </ul>
            </InfoStatus>
            <InfoCaption>
              <DefaultLabel16>{data?.getUserProfile?.bio}</DefaultLabel16>
            </InfoCaption>
          </UserInfo>
        </UserProfile>

        <UserFeeds>
          {data?.getUserProfile?.photo.map((feed) => {
            // return (
            //   <div key={feed.id}>
            //     <img
            //       src={feed.file}
            //       alt={feed.caption}
            //       width="100%"
            //       height="100%"
            //     />
            //   </div>
            // );
            return (
              <UserFeed key={feed.id} image={feed.file}>
                <FeedInfo>
                  <FontAwesomeIcon icon={faHeart} />
                  {feed?.like}
                  <FontAwesomeIcon icon={faMessage} />
                  {feed?.comments?.length}
                </FeedInfo>
              </UserFeed>
            );
          })}
        </UserFeeds>
      </ProfileContainer>
    </Main>
  );
}

export default Profile;
