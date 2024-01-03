'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('employer_room_specialty', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employerId: {
                type: Sequelize.INTEGER // Replace 'roomId' with 'employerId'
            },
            roomId: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('employer_room_specialty'); // Replace 'room_room_specialty' with 'employer_room_specialty'
    }
};
