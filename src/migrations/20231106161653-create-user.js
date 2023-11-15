'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type: Sequelize.STRING
      },
      id: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Follower: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      Following: {
        defaultValue:0,
        type: Sequelize.INTEGER
      },
      Type: {
        allowNull:false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};