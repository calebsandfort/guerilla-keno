import { gql } from "apollo-boost";
import _ from "lodash";
import { errorHandler } from "./index";
import { fragments as payTableRowFragments } from "./payTableRow";

export const fragments = {
  simple: gql`
    fragment SimplePayTable on PayTable {
      id
      spots
      paybackPercentage
      hitFrequency
      special
      rows {
        ...SimplePayTableRow
      }
    }
  `
};

const GET = gql`
  query($id: ID!) {
    payTable(id: $id) {
      ...SimplePayTable
    }
  }
  ${fragments.simple}
  ${payTableRowFragments.simple}
`;

const GET_ALL = gql`
  query {
    payTables {
      ...SimplePayTable
    }
  }
  ${fragments.simple}
  ${payTableRowFragments.simple}
`;

const GET_ALL_QUERYABLE = gql`
  query($query: EntityQuery) {
    payTablesQueryable(query: $query) {
      ...SimplePayTable
    }
  }
  ${fragments.simple}
  ${payTableRowFragments.simple}
`;

const CREATE = gql`
  mutation($input: PayTableInput!) {
    createPayTable(input: $input) {
      ...SimplePayTable
    }
  }
  ${fragments.simple}
  ${payTableRowFragments.simple}
`;

const UPDATE = gql`
  mutation($id: ID!, $input: PayTableInput!) {
    updatePayTable(id: $id, input: $input) {
      ...SimplePayTable
    }
  }
  ${fragments.simple}
  ${payTableRowFragments.simple}
`;

const DELETE = gql`
  mutation($id: ID!) {
    deletePayTable(id: $id)
  }
`;

export const getRequestVariables = () => {
  return {
    id: 0,
    query: null,
    input: {}
  };
};

export const get = async (client, variables) =>
  client
    .query({
      query: GET,
      variables: variables
    })
    .catch(errorHandler);

export const getAll = async (client, variables) =>
  client
    .query({
      query: GET_ALL,
      variables: variables
    })
    .catch(errorHandler);

export const getAllQueryable = async (client, variables) =>
  client
    .query({
      query: GET_ALL_QUERYABLE,
      variables: variables
    })
    .catch(errorHandler);

export const create = async (client, variables) =>
  client
    .mutate({
      mutation: CREATE,
      variables: variables
    })
    .catch(errorHandler);

export const update = async (client, variables) =>
  client
    .mutate({
      mutation: UPDATE,
      variables: variables
    })
    .catch(errorHandler);

export const deletePayTable = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const payTables = [];

  const mappedList = _.map(list, function(x) {
    return {
      spots: x.spots,
      hitFrequency: x.hitFrequency,
      paybackPercentage: x.paybackPercentage,
      special: x.special,
      rows: _.map(x.rows, function(y) {
        return {
          hits: y.hits,
          pays: y.pays
        };
      })
    };
  });

  for (let i = 0; i < mappedList.length; i++) {
    payTables.push(
      (await create(client, {
        input: mappedList[i]
      })).data.createPayTable
    );
  }

  return payTables;
};

export default {
  getRequestVariables,
  get,
  getAll,
  getAllQueryable,
  create,
  update,
  deletePayTable,
  createFromList
};
