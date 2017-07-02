'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'messages',
      'createdBy',
      {
        type: Sequelize.TEXT,
        allowNull:false
      }
    );
  },

  down: function (queryInterface,Sequelize) {
    return queryInterface.removeColumn(
      'messages',
      'createdBy'
    );
  }
};
