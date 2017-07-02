'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {});

  return likes;
};
