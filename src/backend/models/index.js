import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  logging: false
});

const models = {
  PayTable: sequelize.import("./payTable"),
  PayTableRow: sequelize.import("./payTableRow"),
  Game: sequelize.import("./game"),
  GameSlip: sequelize.import("./gameSlip"),
  GameSlipGames: sequelize.import("./gameSlipGames"),
  Play: sequelize.import("./play")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
