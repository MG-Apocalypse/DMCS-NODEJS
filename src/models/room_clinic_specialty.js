'use strict';
const {
    Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room_Clinic_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Room_Clinic_Specialty.init({
        roomId: DataTypes.STRING,
        roomId: DataTypes.STRING,
        specialtyId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Room_Clinic_Specialty',
    });
    return Room_Clinic_Specialty;
};
