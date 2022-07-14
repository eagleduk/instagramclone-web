import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { FEEDSQUERY } from "../Apollo/queries";
import HelmetTitle from "../components/commons/HelmetTitle";
import Feed from "../components/Feed";

const Main = styled.main`
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: scroll;
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
