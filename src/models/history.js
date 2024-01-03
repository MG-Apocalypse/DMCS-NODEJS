'use strict';
const { Model, UUID } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    History.init(
        {
            studentId: DataTypes.INTEGER,
            employerId: DataTypes.INTEGER, // Replace 'roomId' with 'employerId'
            description: DataTypes.TEXT,
            files: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'History',
        }
    );

    return History;
};
