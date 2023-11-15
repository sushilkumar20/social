'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  follower.init({
    followerId: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
    followingId: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    }
  }, {
    sequelize,
    modelName: 'follower',
    underscored: false,
    timestamps: false,
  });
  return follower;
};