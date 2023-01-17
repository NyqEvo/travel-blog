const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { takeRight } = require('lodash');

class Tag extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        } 
    }
)


module.exports = Tag;