const game = (sequelize, DataTypes) => {
  const game = sequelize.define(
    "game",
    {
      date: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false
      },
      dateDisplay: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        length: 50
      },
      draw: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      numbers: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        length: 100
      }
    },
    {
      tableName: "games"
    }
  );

  game.associate = models => {
    game.belongsToMany(models.GameSlip, { through: models.GameSlipGames, onDelete: "CASCADE" });
  };

  return game;
};

export default game;
