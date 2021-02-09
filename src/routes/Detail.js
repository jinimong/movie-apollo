import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Movie from '../components/Movie';
import { gql, useQuery } from '@apollo/client';

const Container = styled.div`
  align-items: center;
`;

const DetailContainer = styled.div`
  height: 70vh;
  width: 100%;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  width: 50%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const SubTitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Suggestions = styled.ul`
  position: fixed;
  bottom: 3%;
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    width: 180px;
    height: 100%;
  }

  li + li {
    margin-left: 20px;
  }
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      star @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });
  if (error) {
    return <dir>Error : {error}</dir>;
  }
  if (loading || !data) {
    return <div>Loading ...</div>;
  }
  const { movie, suggestions } = data;
  return (
    <Container>
      <DetailContainer>
        <Column>
          <Title>{movie.title}</Title>
          <SubTitle>
            {movie.language} : {movie.rating}
          </SubTitle>
          <Description>{movie.description_intro}</Description>
        </Column>
        <span
          style={{
            width: '300px',
            height: '450px',
          }}
        >
          <Movie
            id={movie.id}
            medium_cover_image={movie.medium_cover_image}
            star={movie.star}
            useStar
          />
        </span>
      </DetailContainer>
      <Suggestions>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Movie
              id={suggestion.id}
              medium_cover_image={suggestion.medium_cover_image}
              useLink
            />
          </li>
        ))}
      </Suggestions>
    </Container>
  );
};
export default Detail;
