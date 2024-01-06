'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('room_infor', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            clinicId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            modeId: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            zipRoom: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            nameRoom: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('room_infor'); // Replace 'room_infor' with 'room_infor'
    }
};
