const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");
const User = require("./Users");
const Barang = require("./barangs");

const Wishlist = sequelize.define("wishlists", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  barangId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Wishlist.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Wishlist, { foreignKey: "userId" });

Wishlist.belongsTo(Barang, { foreignKey: "barangId" });
Barang.hasMany(Wishlist, { foreignKey: "barangId" });

module.exports = Wishlist;