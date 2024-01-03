'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            // address: DataTypes.STRING,
            // description: DataTypes.STRING,
            // image: DataTypes.STRING
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },

            employerId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            specialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            roomId: {
                allowNull: true,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('markdowns');
    }
};