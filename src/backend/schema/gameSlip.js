import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    gameSlips(offset: Int, limit: Int, order: String, includeGames: Boolean): [GameSlip!]
    gameSlipsQueryable(query: EntityQuery, includeGames: Boolean): [GameSlip!]
    gameSlipsCount(query: EntityQuery): Int
    gameSlipsMin(propertyName: String, query: EntityQuery): String
    gameSlipsMax(propertyName: String, query: EntityQuery): String
    gameSlip(id: ID!, includeGames: Boolean): GameSlip
  }
  extend type Mutation {
    createGameSlip(input: GameSlipInput!): GameSlip!
    updateGameSlip(id: ID!, input: GameSlipInput!): GameSlip
    deleteGameSlip(id: ID!): Boolean!
  }
  type GameSlip {
    id: ID!
    spots: Int!
    wager: Float!
    gamesToPlay: Int!
    special: Boolean!
    numbers: String!
    numbersArray: [Int]!
    startHour: Int!
    cost: Float!
    winnings: Float!
    profit: Float!
    games: [Game]
  }
  input GameSlipInput {
    spots: Int!
    wager: Float!
    gamesToPlay: Int!
    special: Boolean!
    numbersArray: [Int]!
    startHour: Int!
    cost: Float!
    winnings: Float!
    profit: Float!
    gameIds: [Int]
  }
`;
