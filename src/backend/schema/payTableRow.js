import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    payTableRows(offset: Int, limit: Int, order: String): [PayTableRow!]
    payTableRowsQueryable(query: EntityQuery): [PayTableRow!]
    payTableRow(id: ID!): PayTableRow
  }
  extend type Mutation {
    createPayTableRow(input: PayTableRowInput!): PayTableRow!
    updatePayTableRow(id: ID!, input: PayTableRowInput!): PayTableRow!
    deletePayTableRow(id: ID!): Boolean!
  }
  type PayTableRow {
    id: ID!
    hits: Int!
    pays: Int!
  }
  input PayTableRowInput {
    hits: Int!
    pays: Int!
  }
`;
