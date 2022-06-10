'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate({Genre,Character}) {
      this.belongsTo(Genre,
        {
          foreignKey: {
            name: 'genreId',
            type: DataTypes.INTEGER
          }
        })
      this.belongsToMany(Character, { through: 'characters_movies' })
    }
  }
  Movie.init({
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
    img: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    creationDate: { type: DataTypes.DATE, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
  });
  return Movie;
};