import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import HelmetTitle from "../components/commons/HelmetTitle";
import Feed from "../components/Feed";

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
const Main = styled.main`
  background-color: ${(props) => props.theme.backgroundColor};
`;

function Home() {
  const { data } = useQuery(FEEDSQUERY);
  return (
    <Main>
      <HelmetTitle title="Dukstagram" />
      {data?.viewFeeds?.map((feed) => (
        <Feed key={feed.id} {...feed} />
      ))}
    </Main>
  );
}

export default Home;
