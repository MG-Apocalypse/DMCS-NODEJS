'use strict';
const {
    Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Room_Infor.belongsTo(models.User, { foreignKey: 'roomId' }); // Replace 'roomId' with 'roomId'
            Room_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceIdData' })
            Room_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentIdData' })
            Room_Infor.belongsTo(models.Allcode, { foreignKey: 'modeId', targetKey: 'keyMap', as: 'modeIdData' })

        }
    }
    Room_Infor.init({
        roomId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        modeId: DataTypes.STRING,
        zipRoom: DataTypes.STRING,
        nameRoom: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Room_Infor',
        freezeTableName: true
    });
    return Room_Infor;
};
