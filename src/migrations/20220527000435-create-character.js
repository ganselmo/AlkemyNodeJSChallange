'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      weigth: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      story: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('characters');
  }
};