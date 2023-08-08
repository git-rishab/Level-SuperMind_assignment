const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Comment = sequelize.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  PostId: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  name:{
    type: DataTypes.TEXT,
    allowNull: false,
  }
});
module.exports = {Comment};