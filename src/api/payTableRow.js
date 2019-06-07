import { gql } from "apollo-boost";
import { errorHandler } from "./index";

export const fragments = {
  simple: gql`
    fragment SimplePayTableRow on PayTableRow {
      id
      hits
      pays
    }
  `
};

const GET = gql`
  query($id: ID!) {
    payTableRow(id: $id) {
      ...SimplePayTableRowRow
    }
  }
  ${fragments.simple}
`;

const GET_ALL = gql`
  query {
    payTableRows {
      ...SimplePayTableRow
    }
  }
  ${fragments.simple}
`;

const GET_ALL_QUERYABLE = gql`
  query($query: EntityQuery) {
    payTableRowsQueryable(query: $query) {
      ...SimplePayTableRow
    }
  }
  ${fragments.simple}
`;

const CREATE = gql`
  mutation($input: PayTableRowInput!) {
    createPayTableRow(input: $input) {
      ...SimplePayTableRow
    }
  }
  ${fragments.simple}
`;

const UPDATE = gql`
  mutation($id: ID!, $input: PayTableRowInput!) {
    updatePayTableRow(id: $id, input: $input) {
      ...SimplePayTableRow
    }
  }
  ${fragments.simple}
`;

const DELETE = gql`
  mutation($id: ID!) {
    deletePayTableRow(id: $id)
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

export const deletePayTableRow = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const payTableRows = [];

  for (let i = 0; i < list.length; i++) {
    payTableRows.push(
      (await create(client, {
        input: list[i]
      })).data.createPayTableRow
    );
  }

  return payTableRows;
};

export default {
  getRequestVariables,
  get,
  getAll,
  getAllQueryable,
  create,
  update,
  deletePayTableRow,
  createFromList
};
