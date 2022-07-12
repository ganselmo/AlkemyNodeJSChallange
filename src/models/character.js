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
    static associate() {

    }
  }
  Character.init({
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
    img: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    weigth: { type: DataTypes.DECIMAL, allowNull: false },
    story: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'characters',
    modelName: 'Character',
  });
  return Character;
};