import { gql } from "apollo-boost";
import { errorHandler } from "./index";
// import * as statuses from "../backend/enums/statuses";
// import * as utilities from "../backend/utilities/utilities";

export const fragments = {
  simple: gql`
    fragment SimpleGame on Game {
      id
      date
      dateDisplay
      draw
      numbers
      numbersArray
    }
  `
};

const GET = gql`
  query($id: ID!) {
    game(id: $id) {
      ...SimpleGame
    }
  }
  ${fragments.simple}
`;

const GET_ALL = gql`
  query {
    games {
      ...SimpleGame
    }
  }
  ${fragments.simple}
`;

const GET_ALL_QUERYABLE = gql`
  query($query: EntityQuery) {
    gamesQueryable(query: $query) {
      ...SimpleGame
    }
  }
  ${fragments.simple}
`;

const COUNT = gql`
  query($query: EntityQuery) {
    gamesCount(query: $query)
  }
`;

const MIN = gql`
  query($propertyName: String, $query: EntityQuery) {
    gamesMin(propertyName: $propertyName, query: $query)
  }
`;

const MAX = gql`
  query($propertyName: String, $query: EntityQuery) {
    gamesMax(propertyName: $propertyName, query: $query)
  }
`;

const CREATE = gql`
  mutation($input: GameInput!) {
    createGame(input: $input) {
      ...SimpleGame
    }
  }
  ${fragments.simple}
`;

const UPDATE = gql`
  mutation($id: ID!, $input: GameInput!) {
    updateGame(id: $id, input: $input) {
      ...SimpleGame
    }
  }
  ${fragments.simple}
`;

const DELETE = gql`
  mutation($id: ID!) {
    deleteGame(id: $id)
  }
`;

export const getRequestVariables = () => {
  return {
    id: 0,
    query: null,
    input: {},
    propertyName: null
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

export const count = async (client, variables) =>
  client
    .query({
      query: COUNT,
      variables: variables
    })
    .catch(errorHandler);

export const min = async (client, variables) =>
  client
    .query({
      query: MIN,
      variables: variables
    })
    .catch(errorHandler);

export const max = async (client, variables) =>
  client
    .query({
      query: MAX,
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

export const deleteGame = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const games = [];

  for (let i = 0; i < list.length; i++) {
    games.push(
      (await create(client, {
        input: list[i]
      })).data.createGame
    );
  }

  return games;
};

export default {
  getRequestVariables,
  get,
  getAll,
  getAllQueryable,
  count,
  min,
  max,
  create,
  update,
  deleteGame,
  createFromList
};
