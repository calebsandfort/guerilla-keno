const payTableRow = (sequelize, DataTypes) => {
  const payTableRow = sequelize.define(
    "payTableRow",
    {
      hits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      pays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: "payTableRows"
    }
  );

  return payTableRow;
};

export default payTableRow;
