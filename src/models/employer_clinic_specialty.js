'use strict';
const {
    Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employer_Clinic_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Employer_Clinic_Specialty.init({
        employerId: DataTypes.STRING,
        roomId: DataTypes.STRING,
        specialtyId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Employer_Clinic_Specialty',
    });
    return Employer_Clinic_Specialty;
};
