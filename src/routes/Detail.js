import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

const Container = styled.div`
  height: 100vh;
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

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
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
  const { movie } = data;
  return (
    <Container>
      <Column>
        <Title>{movie.title}</Title>
        <SubTitle>
          {movie.language} : {movie.rating}
        </SubTitle>
        <Description>{movie.description_intro}</Description>
      </Column>
      <Poster bg={movie.medium_cover_image} />
    </Container>
  );
};
export default Detail;
