'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    body: DataTypes.STRING(140),
    userId: DataTypes.INTEGER
  }, {});

  messages.associate = function (models) {
    messages.belongsTo(models.users, {as: "createdBy",foreignKey:"userId"});
  };
  return messages;
};
