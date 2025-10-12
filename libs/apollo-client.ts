import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_SERVER_HOST } from '@/utils/constant';

const client = new ApolloClient({
  uri: `${API_SERVER_HOST}/graphql`, // Thay bằng API GraphQL của bạn
  cache: new InMemoryCache(),
});

export default client;