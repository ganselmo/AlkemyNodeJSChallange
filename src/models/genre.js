'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie}) {
      this.hasMany(Movie)
    }
  }
  Genre.init({
    uuid:{ type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
    img:{ type: DataTypes.STRING, allowNull: false },
    name:{ type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    tableName:'genres',
    modelName: 'Genre',
  });
  return Genre;
};