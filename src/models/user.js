'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toJSON() {
      return { firstName: this.firstName, lastName: this.lastName, email: this.email }
    }

  }
  User.init({
    uuid: {allowNull: false,defaultValue: DataTypes.UUIDV4,type: DataTypes.UUID},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};