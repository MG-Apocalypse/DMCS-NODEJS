import db from "../models"

let getRoomStudent = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: "R2" },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllRooms = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let rooms = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: rooms
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveDetailInforRoom = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.id || inputData.contentHTML || inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Miising parameter'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    roomId: inputData.roomId
                })
                resolve({
                    errCode: 0,
                    errMessage: 'save infor room succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getRoomStudent: getRoomStudent,
    getAllRooms: getAllRooms,
    saveDetailInforRoom: saveDetailInforRoom
}