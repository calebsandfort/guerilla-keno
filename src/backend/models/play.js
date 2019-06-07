const play = (sequelize, DataTypes) => {
  const play = sequelize.define(
    "play",
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
      tableName: "plays"
    }
  );

  play.associate = models => {
    play.hasMany(models.GameSlip, {
      onDelete: "CASCADE"
    });
  };

  return play;
};

export default play;
