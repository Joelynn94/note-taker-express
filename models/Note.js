const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
  },
  {
    timestamps: true,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'note',
  }
);
// the defined model is the class itself
console.log(Note === sequelize.models.Note); // true

module.exports = Note;
