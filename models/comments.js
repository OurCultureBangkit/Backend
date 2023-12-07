const sequelize = require("../config/connection");
const { DataTypes } = require("sequelize");
const User = require("./Users");
const Barang = require("./barangs");

const Comment = sequelize.define("comments", {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  barangId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

Comment.belongsTo(Barang, { foreignKey: "barangId" });
Barang.hasMany(Comment, { foreignKey: "barangId" });

Comment.hasMany(Comment, { foreignKey: "commentId", as: "replies" });

module.exports = Comment;