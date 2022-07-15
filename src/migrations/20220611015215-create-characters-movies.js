'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters_movies', {

      character_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'characters'
          },
          key: 'uuid'
        },
      },
      movie_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'movies'
          },
          key: 'uuid'
        },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters_Movies');
  }
};