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
  Genre.afterValidate
  Genre.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty:true,
        isUrl: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull:true,
        notEmpty:true,
        isAlpha: true,
      }
    }
  }, {
    sequelize,
    tableName:'genres',
    modelName: 'Genre',
  });
  return Genre;
};