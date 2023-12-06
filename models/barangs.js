const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./Users");

const Barang = sequelize.define("barangs", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Barang.belongsTo(User, { foreignKey: "userId" });
Barang.hasMany(User, { foreignKey: "userId" });

module.exports = Barang;
