'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      //check for uuidV4 functionality
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', {
        transaction
      })
      //Drop constraint movies_pkey 
      await queryInterface.sequelize.query(
        'ALTER TABLE "movies" DROP CONSTRAINT IF EXISTS movies_pkey CASCADE;', {
        transaction
      })
      //Drop constraint movies_genre_id_fkey foregin
      await queryInterface.sequelize.query(
        'ALTER TABLE "movies" drop constraint movies_genre_id_fkey cascade;', {
        transaction
      })

      //change column genre_id on movies to UUID
      await queryInterface.changeColumn('movies', 'genre_id', {
        allowNull: false,
        type: "UUID USING (uuid_generate_v4())",
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
        {
          transaction
        })

      // renname column
      await queryInterface.renameColumn("movies", "genre_id", "genre_uuid", {
        transaction,
      });

      //change column uuid on genres to PK
      await queryInterface.changeColumn('genres', 'uuid', {
        allowNull: false,
        type: "UUID USING (uuid_generate_v4())",
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true,

      }, { transaction })

      //Add constraint pk on movies to genre uuid
      await queryInterface.addConstraint('movies', {
        type: 'foreign key',
        name: 'movies_pkey',
        fields: ['genre_uuid'],
        references: {
          table: 'genres',
          field: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction
      })
      //remove column id
      await queryInterface.removeColumn('genres', 'id', { transaction })

      return transaction.commit();
    }
    catch (error) {


      return transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {

    const firstUndoTran = await queryInterface.sequelize.transaction();

    try {

      //change uuid column to no pk
      await queryInterface.changeColumn('genres', 'uuid', {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        unique: true,
        primaryKey: false
      }, { firstUndoTran })

      //Add column id in genres
      await queryInterface.addColumn('genres', 'id', {

        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true

      }, { firstUndoTran })

      //remove constraint id in genres
      await queryInterface.removeConstraint('movies', 'movies_pkey', {
        firstUndoTran
      })

      //change column genre_id on movies to UUID
      await queryInterface.removeColumn('movies', 'genre_uuid', { firstUndoTran })
      firstUndoTran.commit();
    }
    catch (error) {
      firstUndoTran.rollback();
    }
    const secondUndoTran = await queryInterface.sequelize.transaction();
    try {
      // rename column
      await queryInterface.addColumn("movies", "genre_id", {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true
      }, { secondUndoTran });

      //Add constraint movies_genre_id_fkey foregin
      await queryInterface.addConstraint('movies', {
        type: 'foreign key',
        name: 'movies_genre_id_fkey',
        fields: ['genre_id'],
        references: {
          table: 'genres',
          field: 'id',
        },
        onUpdate: 'CASCADE',

        onDelete: 'CASCADE',
        secondUndoTran
      })
      //Drop constraint movies_pkey 
      await queryInterface.addConstraint('movies', {
        type: 'foreign key',
        name: 'movies_pkey',
        fields: ['genre_id'],
        references: {
          table: 'genres',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        secondUndoTran
      })
      secondUndoTran.commit();

    } catch (error) {
      secondUndoTran.rollback();
    }
    return
  }
};
