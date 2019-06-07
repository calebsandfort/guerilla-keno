import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    games(offset: Int, limit: Int, order: String): [Game!]
    gamesQueryable(query: EntityQuery): [Game!]
    gamesCount(query: EntityQuery): Int
    gamesMin(propertyName: String, query: EntityQuery): String
    gamesMax(propertyName: String, query: EntityQuery): String
    game(id: ID!): Game
  }
  extend type Mutation {
    createGame(input: GameInput!): Game!
    updateGame(id: ID!, input: GameInput!): Game
    deleteGame(id: ID!): Boolean!
  }
  type Game {
    id: ID!
    date: String!
    dateDisplay: String!
    draw: Int!
    numbers: String!
    numbersArray: [Int]!
  }
  input GameInput {
    date: String!
    dateDisplay: String!
    draw: Int!
    numbersArray: [Int]!
  }
`;
