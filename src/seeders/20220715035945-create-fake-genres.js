'use strict';

const faker = require('faker');

module.exports = {
  async up(queryInterface, Sequelize) {


    const genres = [...Array(11)].map((genre)=>{
      genre = {}
      genre.uuid= Sequelize.literal('uuid_generate_v4()');
      genre.name= faker.company.catchPhraseAdjective();
      genre.createdAt=new Date();
      genre.imgUrl= faker.image.technics(640, 480, true) ;
      genre.updatedAt=new Date();
      return genre
    })
    try {
      await queryInterface.bulkInsert('genres', genres, {});
    } catch (error) {
      console.log(error)
    }
   
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
