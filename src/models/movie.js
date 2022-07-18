'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    toJSON() {
      return { ...this.get(), genre_uuid: undefined, createdAt: undefined, updatedAt: undefined,Characters_Movies:undefined}
    }
    static associate({ Genre }) {
      this.belongsTo(Genre,
        {
          as:"genre",
          foreignKey: {
            name: 'genre_uuid',
            type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4
          }

        })
    }
  }
  Movie.init({
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
        notNull: true,
        notEmpty: true,
        isUrl: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric:true,
        len:[3,255]
      }
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        isDate:true,
      }
    },
    genre_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate:{
        notNull:true,
        notEmpty:true,
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric:true,
        isOutRange(value) {
          if ( value<0 || value>6) {
            throw new Error('Only 1 to 5 values are allowed');
          }
        }
      }
    }
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
  });
  return Movie;
};