import { raw } from "body-parser";
import db from "../models/index";
require('dotenv').config();
import _, { reject } from 'lodash';
import moment from 'moment'
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getEmployerStudent = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: "R4" },
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

let getAllEmployers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let employers = await db.User.findAll({
                where: { roleId: "R4" },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: employers
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveDetailInfoEmployer = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.employerId || !inputData.contentHTML
                || !inputData.contentMarkdown || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter`
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        employerId: inputData.employerId
                    })
                } else if (inputData.action === 'EDIT') {
                    let employerMarkdown = await db.Markdown.findOne({
                        where: { employerId: inputData.employerId },
                        raw: false
                    })
                    if (employerMarkdown) {
                        employerMarkdown.contentHTML = inputData.contentHTML;
                        employerMarkdown.contentMarkdown = inputData.contentMarkdown;
                        employerMarkdown.description = inputData.description;
                        employerMarkdown.updateAt = new Date();
                        await employerMarkdown.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: `Save info employer succeed`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailEmployerById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameter`
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [`description`, `contentHTML`, `contentMarkdown`]
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.employerId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required param !"
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item
                    })
                }

                let existing = await db.Schedule.findAll({
                    where: { employerId: data.employerId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'employerId', 'maxNumber'],
                    raw: true
                });

                // convert date
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }

                // compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getScheduleByDate = (employerId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!employerId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        employerId: employerId,
                        date: date
                    }
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getEmployerStudent: getEmployerStudent,
    getAllEmployers: getAllEmployers,
    saveDetailInfoEmployer: saveDetailInfoEmployer,
    getDetailEmployerById: getDetailEmployerById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
}
