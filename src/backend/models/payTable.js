const payTable = (sequelize, DataTypes) => {
  const payTable = sequelize.define(
    "payTable",
    {
      spots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hitFrequency: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      paybackPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      special: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: "payTables"
    }
  );

  payTable.associate = models => {
    payTable.hasMany(models.PayTableRow, {
      onDelete: "CASCADE"
    });
  };

  return payTable;
};

export default payTable;
