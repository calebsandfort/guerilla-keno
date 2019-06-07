import game from "./game";

const gameSlip = (sequelize, DataTypes) => {
  const gameSlip = sequelize.define(
    "gameSlip",
    {
      spots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      wager: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      gamesToPlay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      special: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      numbers: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        length: 100
      },
      startHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      winnings: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      profit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: "gameSlips"
    }
  );

  gameSlip.associate = models => {
    gameSlip.belongsToMany(models.Game, { through: models.GameSlipGames, as: "games", onDelete: "CASCADE" });
  };

  return gameSlip;
};

export default gameSlip;
