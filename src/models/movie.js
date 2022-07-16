'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate({ Genre }) {
      this.belongsTo(Genre,
        {
          foreignKey: {
            name: 'genre_uuid',
            type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, unique: true
          }
        })
    }
  }
  Movie.init({
    uuid: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, unique: true },
    imgUrl: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    creationDate: { type: DataTypes.DATE, allowNull: false },
    genre_uuid: {   type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, unique: true },
    rating: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
  });
  return Movie;
};