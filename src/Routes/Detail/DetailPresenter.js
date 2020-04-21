import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Production from "Components/Production";
import Seasons from "../../Components/Seasons";
import Trailers from "../../Components/Trailer";

const openTab = (e, tabName) => {
  let i;
  const tabContents = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  const tabLinks = document.getElementsByClassName("tabLinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
    tabLinks[i].style.backgroundColor = "white";
    tabLinks[i].style.color = "black";
  }
  document.getElementById(tabName).style.display = "block";
  e.target.classList.add("active");
  e.target.style.backgroundColor = "#6e7778";
  e.target.style.color = "white";
};

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Homepage = styled.button`
  margin: 15px 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  border: none;
`;

const Link = styled.a`
  font-size: 13px;
`;

const Tabs = styled.div`
  margin-top: 20px;
  width: 400px;
`;

const TabItem = styled.button`
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 35px;
`;

const TabContent = styled.div`
  margin-top: 15px;
  background-color: rgba(110, 119, 120, 0.6);
  overflow: scroll;
  border-radius: 15px;
  padding: 10px 15px;
  width: 400px;
`;

const DetailPresenter = ({ result, loading, error, isMovie }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Homepage>
            {" "}
            <Link
              href={result.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Homepage
            </Link>
          </Homepage>
          <Tabs>
            <TabItem
              className="tabLinks"
              style={{ backgroundColor: "#6e7778", color: "white" }}
              onClick={(e) => {
                openTab(e, "trailers");
              }}
            >
              Trailers
            </TabItem>
            <TabItem
              className="tabLinks"
              onClick={(e) => {
                openTab(e, "production");
              }}
            >
              Production
            </TabItem>
            {!isMovie && (
              <TabItem
                className="tabLinks"
                onClick={(e) => {
                  openTab(e, "seasons");
                }}
              >
                Seasons
              </TabItem>
            )}
          </Tabs>
          <TabContent
            id="trailers"
            className="tabContent"
            style={{ display: "block" }}
          >
            <Trailers videos={result.videos.results}></Trailers>
          </TabContent>
          <TabContent
            id="production"
            className="tabContent"
            style={{ display: "none" }}
          >
            <Production result={result} isMovie={isMovie}></Production>
          </TabContent>
          <TabContent
            id="seasons"
            className="tabContent"
            style={{ display: "none" }}
          >
            {!isMovie ? <Seasons seasons={result.seasons} /> : ""}
          </TabContent>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
