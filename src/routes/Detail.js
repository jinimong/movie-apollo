import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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
  return (
    <div>
      {loading && <div>Loading ...</div>}
      {!loading && data.movie && data.movie.title}
    </div>
  );
};
export default Detail;
