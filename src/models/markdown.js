'use strict';
const { Model, UUID } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: 'roomId' }); // Replace 'roomId' with 'roomId'
        }
    }

    Markdown.init(
        {
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            description: DataTypes.TEXT('long'),
            roomId: DataTypes.INTEGER, // Replace 'roomId' with 'roomId'
            specialtyId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Markdown',
        }
    );

    return Markdown;
};
