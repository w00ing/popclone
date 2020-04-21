import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Video = styled.iframe`
  width: 400px;
  height: 240px;
  margin-right: 15px;
`;

const Trailers = ({ videos }) => {
  return (
    <Container>
      {videos.map((video) => (
        <Video
          key={video.id}
          src={`https://www.youtube.com/embed/${video.key}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></Video>
      ))}
    </Container>
  );
};
export default Trailers;
