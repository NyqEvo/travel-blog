const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}


Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        foodDrink: {
            type: DataTypes.BOOLEAN,

        },
        transportation: {
            type: DataTypes.BOOLEAN,
        },
        entertainment: {
            type: DataTypes.BOOLEAN,
        },
        accommodations: {
            type: DataTypes.BOOLEAN,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tag',
    }
)


module.exports = Tag;