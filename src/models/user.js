'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const {serverConfig} = require("../config");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      unique: true
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type:DataTypes.STRING,
    },
    location: {
      type:DataTypes.STRING,
    },
    externalLink: {
      type:DataTypes.STRING,
    },
    created_at: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    Follower: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    Following: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    Type: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'user',
    underscored: false,
    timestamps: false,
  });

  user.beforeCreate(function encrypt(user){
    console.log(user)
    let encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUND);
    user.password = encryptedPassword;
    console.log(user)

  })
  return user;
};