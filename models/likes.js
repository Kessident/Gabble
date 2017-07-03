'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {});

  likes.associate = function (models) {
    likes.belongsTo(models.users, {as:"likedBy", foreignKey:"userId"});
    likes.belongsTo(models.messages, {as:"likedMsg", foreignKey:"messageId"});
  };
  return likes;
};
