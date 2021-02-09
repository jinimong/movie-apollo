import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar as Star, FaRegStar as UnStar } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

const ScaleUp = keyframes`
  from {
    transform: scale(1.0);
  }
  to {
    transform: scale(1.05);
  }
`;

const Rotation = keyframes`
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(45deg) scale(1.4);
    color: lightgray;
  }
  100% {
    transform: rotate(0);
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  ${(props) =>
    props.useLink &&
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      &:hover {
        animation: ${ScaleUp} 0.5s alternate forwards;
      }
    `}

  ${(props) =>
    props.useStar &&
    css`
      &:hover {
        cursor: ${props.useLink ? 'initial' : 'normal'};

        .star {
          display: initial;
          animation: ${Rotation} 1s ease-in-out forwards;
        }
      }
    `}
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const StarButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  display: none;
  color: white;
  ${({ star }) =>
    star &&
    css`
      display: initial;
      color: orange;
    `}
  &:hover {
    cursor: pointer;
    color: ${({ star }) => (star ? 'lightgray' : 'orange')};
  }
`;

const TOGGLE_STAR = gql`
  mutation toggleStar($id: Int!) {
    toggleStar(id: $id) @client
  }
`;

const Movie = ({ id, medium_cover_image, star, useLink, useStar }) => {
  const [toggleStar] = useMutation(TOGGLE_STAR, { variables: { id: +id } });
  return (
    <Container useLink={useLink} useStar={useStar}>
      <Link to={useLink ? `/${id}` : '#'}>
        <Poster bg={medium_cover_image} />
      </Link>
      {useStar && (
        <StarButton className="star" star={star} onClick={toggleStar}>
          {star ? <Star /> : <UnStar />}
        </StarButton>
      )}
    </Container>
  );
};
export default Movie;
