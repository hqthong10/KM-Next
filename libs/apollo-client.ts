import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:3020/graphql", // Thay bằng API GraphQL của bạn
  cache: new InMemoryCache(),
});

export default client;