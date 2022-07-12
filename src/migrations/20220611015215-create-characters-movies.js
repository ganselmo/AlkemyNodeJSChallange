'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters_movies', {

      character_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'characters'
          },
          key: 'id'
        },
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'movies'
          },
          key: 'id'
        },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters_Movies');
  }
};