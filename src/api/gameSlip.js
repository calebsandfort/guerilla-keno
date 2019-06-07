import { gql } from "apollo-boost";
import { errorHandler } from "./index";
// import * as statuses from "../backend/enums/statuses";
// import * as utilities from "../backend/utilities/utilities";
import { fragments as gameFragments } from "./game";

export const fragments = {
  simple: gql`
    fragment SimpleGameSlip on GameSlip {
      id
      spots
      wager
      gamesToPlay
      special
      numbers
      numbersArray
      startHour
      cost
      winnings
      profit
      games @include(if: $includeGames) {
        ...SimpleGame
      }
    }
  `
};

const GET = gql`
  query($id: ID!, $includeGames: Boolean!) {
    gameSlip(id: $id) {
      ...SimpleGameSlip
    }
  }
  ${fragments.simple}
  ${gameFragments.simple}
`;

const GET_ALL = gql`
  query($includeGames: Boolean!) {
    gameSlips {
      ...SimpleGameSlip
    }
  }
  ${fragments.simple}
  ${gameFragments.simple}
`;

const GET_ALL_QUERYABLE = gql`
  query($query: EntityQuery, $includeGames: Boolean!) {
    gameSlipsQueryable(query: $query) {
      ...SimpleGameSlip
    }
  }
  ${fragments.simple}
  ${gameFragments.simple}
`;

const COUNT = gql`
  query($query: EntityQuery) {
    gameSlipsCount(query: $query)
  }
`;

const MIN = gql`
  query($propertyName: String, $query: EntityQuery) {
    gameSlipsMin(propertyName: $propertyName, query: $query)
  }
`;

const MAX = gql`
  query($propertyName: String, $query: EntityQuery) {
    gameSlipsMax(propertyName: $propertyName, query: $query)
  }
`;

const CREATE = gql`
  mutation($input: GameSlipInput!) {
    createGameSlip(input: $input) {
      ...SimpleGameSlip
    }
  }
  ${fragments.simple}
`;

const UPDATE = gql`
  mutation($id: ID!, $input: GameSlipInput!) {
    updateGameSlip(id: $id, input: $input) {
      ...SimpleGameSlip
    }
  }
  ${fragments.simple}
`;

const DELETE = gql`
  mutation($id: ID!) {
    deleteGameSlip(id: $id)
  }
`;

export const getRequestVariables = () => {
  return {
    id: 0,
    query: null,
    input: {},
    propertyName: null,
    includeGames: false
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

export const deleteGameSlip = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const gameSlips = [];

  for (let i = 0; i < list.length; i++) {
    gameSlips.push(
      (await create(client, {
        input: list[i]
      })).data.createGameSlip
    );
  }

  return gameSlips;
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
  deleteGameSlip,
  createFromList
};
