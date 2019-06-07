import { gql } from "apollo-server-express";

import payTableSchema from "./payTable";
import payTableRowSchema from "./payTableRow";
import gameSchema from "./game";
import gameSlipSchema from "./gameSlip";
import playSchema from "./play";
import entityQuerySchema from "./entityQuery";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, payTableSchema, payTableRowSchema, gameSchema, gameSlipSchema, playSchema, entityQuerySchema];
