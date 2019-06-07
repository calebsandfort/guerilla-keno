import "cross-fetch/polyfill";
import ApolloClient from "apollo-boost";

export const getClient = () =>
  new ApolloClient({
    uri: "http://localhost:6050/graphql"
  });
