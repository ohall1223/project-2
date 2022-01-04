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
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperatureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicationTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentSymptoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionalInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "patient",
        key: "id",
      },
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
