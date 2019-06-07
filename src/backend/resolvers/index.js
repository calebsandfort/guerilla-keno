import { GraphQLDateTime } from "graphql-iso-date";

import payTableResolvers from "./payTable";
import payTableRowResolvers from "./payTableRow";
import gameResolvers from "./game";
import gameSlipResolvers from "./gameSlip";
import playResolvers from "./play";
// import {scalarResolverMap} from './scalars'

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  // scalarResolverMap,
  customScalarResolver,
  payTableResolvers,
  payTableRowResolvers,
  gameResolvers,
  gameSlipResolvers,
  playResolvers
];
