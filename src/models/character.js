'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    
    toJSON() {
      return { ...this.get(), genre_uuid: undefined, createdAt: undefined, updatedAt: undefined }
    }
    
    static associate() {

    }
  }
  Character.init({
    uuid: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4, unique: true },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isUrl: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isNumeric:true,
        min:0,
        max:130
      }
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        isNumeric:true,
        min:0
      }
    },
    story: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    tableName: 'characters',
    modelName: 'Character',
  });
  return Character;
};