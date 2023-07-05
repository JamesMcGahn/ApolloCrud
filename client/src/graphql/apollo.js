import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        companies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        myTickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        blogs: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_BE_DOMAIN,
  cache,
  credentials: 'include',
  connectToDevTools: true,
});

export default client;
