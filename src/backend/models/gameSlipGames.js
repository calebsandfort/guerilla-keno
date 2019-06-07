const gameSlipGames = (sequelize, DataTypes) => {
  const gameSlipGames = sequelize.define(
    "gameSlipGames",
    {},
    {
      tableName: "gameSlipGames"
    }
  );

  return gameSlipGames;
};

export default gameSlipGames;
