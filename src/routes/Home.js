import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 40vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  position: relative;
  top: -50px;
`;

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (error) {
    return <dir>Error : {error}</dir>;
  }
  return (
    <Container>
      <Header>
        <Title>Netflix</Title>
      </Header>
      {loading && <Loading>Loading ...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data.movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              medium_cover_image={movie.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};

export default Home;
