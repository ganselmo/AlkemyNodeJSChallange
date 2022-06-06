'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    img: DataTypes.STRING,
    title: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    rating: DataTypes.DECIMAL
  }, {
    sequelize,
    tableName:'movies',
    modelName: 'Movie',
  });
  return Movie;
};