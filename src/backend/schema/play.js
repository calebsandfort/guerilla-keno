import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    plays(offset: Int, limit: Int, order: String): [Play!]
    playsQueryable(query: EntityQuery): [Play!]
    playsCount(query: EntityQuery): Int
    playsMin(propertyName: String, query: EntityQuery): String
    playsMax(propertyName: String, query: EntityQuery): String
    play(id: ID!): Play
  }
  extend type Mutation {
    createPlay(input: PlayInput!): Play!
    updatePlay(id: ID!, input: PlayInput!): Play
    deletePlay(id: ID!): Boolean!
  }
  type Play {
    id: ID!
    date: String!
    dateDisplay: String!
    cost: Float!
    winnings: Float!
    profit: Float!
    gameSlips: [GameSlip]
  }
  input PlayInput {
    date: String!
    dateDisplay: String!
    cost: Float!
    winnings: Float!
    profit: Float!
    gameSlips: [GameSlipInput]
  }
`;
