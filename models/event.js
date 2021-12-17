const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    temperture: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temperatureTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medication: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medicationTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medicationDosage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "events",
  }
);

module.exports = Event;
