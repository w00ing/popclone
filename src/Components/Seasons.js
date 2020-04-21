import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-right: 15px;
  padding-top: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SeasonPoster = styled.div`
  width: 120px;
  background-image: url(${(props) => props.bgImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 160px;
`;
//
const Seasons = ({ seasons }) => {
  return (
    <Container>
      {seasons.map((season) => (
        <Item key={season.id}>
          <SeasonPoster
            bgImage={
              season.poster_path
                ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                : require("../assets/noPosterSmall.png")
            }
          ></SeasonPoster>
          {season.name}
        </Item>
      ))}
    </Container>
  );
};

export default Seasons;
