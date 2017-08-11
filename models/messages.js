'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    body: DataTypes.STRING(140),
    userId: DataTypes.INTEGER
  }, {});

  messages.associate = (models) => {
    messages.belongsTo(models.users, {as: "createdBy", foreignKey:"userId"});
    messages.hasMany(models.likes, {as:"likedBy", foreignKey:"messageId"});
  };
  return messages;
};
