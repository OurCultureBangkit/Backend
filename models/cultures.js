const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");

const Cultures = sequelize.define("cultures", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
});

module.exports = Cultures;