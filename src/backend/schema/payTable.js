import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    payTables(offset: Int, limit: Int, order: String): [PayTable!]
    payTablesQueryable(query: EntityQuery): [PayTable!]
    payTable(id: ID!): PayTable
  }
  extend type Mutation {
    createPayTable(input: PayTableInput!): PayTable!
    updatePayTable(id: ID!, input: PayTableInput!): PayTable
    deletePayTable(id: ID!): Boolean!
  }
  type PayTable {
    id: ID!
    spots: Int!
    hitFrequency: Float!
    paybackPercentage: Float!
    special: Boolean!
    rows: [PayTableRow]!
  }
  input PayTableInput {
    spots: Int!
    hitFrequency: Float!
    paybackPercentage: Float!
    special: Boolean!
    rows: [PayTableRowInput]!
  }
`;
