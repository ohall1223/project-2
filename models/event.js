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
      allowNull: true,
    },
    temperatureTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicationTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicationDosage: {
      type: DataTypes.STRING,
      allowNull: true,
        },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'patient',
        key: 'id',
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
