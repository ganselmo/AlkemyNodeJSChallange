'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characters_Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Movie.belongsToMany(models.Character, { through: Characters_Movies,foreignKey: 'movie_id'} );
      models.Character.belongsToMany(models.Movie, { through: Characters_Movies,foreignKey: 'character_id'});
    }
  }
  Characters_Movies.init({
    character_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
     timestamps: false ,
    tableName: 'characters_movies',
    modelName: 'Characters_Movies',
  });
  return Characters_Movies;
};