'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Character.init({
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.DECIMAL,
    weigth: DataTypes.DECIMAL,
    story: DataTypes.STRING
  }, {
    sequelize,
    tableName:'characters',
    modelName: 'Character',
  });
  return Character;
};