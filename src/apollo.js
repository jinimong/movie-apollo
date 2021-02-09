import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      star: () => false,
    },
    Mutation: {
      toggleStar: (_, { id }, { cache }) => {
        const clickedMovie = {
          __typename: 'Movie',
          id,
        };
        cache.modify({
          id: cache.identify(clickedMovie),
          fields: {
            star(cachedStar) {
              return !cachedStar;
            },
          },
        });
      },
    },
  },
});

export default client;
