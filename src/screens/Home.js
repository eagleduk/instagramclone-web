import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Avatar from "../components/commons/Avatar";
import HelmetTitle from "../components/commons/HelmetTitle";

const FEEDSQUERY = gql`
  query ViewFeeds {
    viewFeeds {
      id
      createdAt
      caption
      file
      user {
        username
        id
        avator
      }
      isOwner
      like
      comments
    }
  }
`;

const FeedContainer = styled.div`
  max-width: 470px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;
const FeedContent = styled.div``;
const FeedFooter = styled.div``;

function Home() {
  const { data } = useQuery(FEEDSQUERY);
  return (
    <main>
      <HelmetTitle title="Dukstagram" />
      <FeedContainer>
        <FeedHeader>
          <Avatar />
          <span>username</span>
        </FeedHeader>
        <FeedContent>images</FeedContent>
        <FeedFooter>
          <div>
            <div>like popup paper plane</div>
            <div>bookmark</div>
          </div>
          <div>comments...</div>
        </FeedFooter>
      </FeedContainer>
      {data?.viewFeeds?.map((feed) => (
        <FeedContainer>
          <FeedHeader>header</FeedHeader>
          <FeedContent>main</FeedContent>
          <FeedFooter></FeedFooter>
        </FeedContainer>
      ))}
    </main>
  );
}

export default Home;
