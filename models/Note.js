const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    info: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    mon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "note",
  }
);

module.exports = Note;