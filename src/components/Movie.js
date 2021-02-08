import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const ScaleUp = keyframes`
  from {
    transform: scale(1.0);
  }
  to {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    animation: ${ScaleUp} 0.5s alternate forwards;
  }
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, medium_cover_image }) => (
  <Container>
    <Link to={`/${id}`}>
      <Poster bg={medium_cover_image} />
    </Link>
  </Container>
);
export default Movie;