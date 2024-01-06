import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService"
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (roomId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&roomId=${roomId}`
    return result
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.roomId || !data.timeType || !data.date || !data.fullName
                || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing  parameters"
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    studentName: data.fullName,
                    time: data.timeString,
                    roomName: data.roomName,
                    redirectLink: buildUrlEmail(data.roomId, token)
                })



                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },
                    raw: true
                });

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { studentId: user[0].id },
                        defaults: {
                            statusID: 'S1',
                            roomId: data.roomId,
                            studentId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    data: user,
                    errCode: 0,
                    errMessage: "Save infor student succeed"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.roomId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        roomId: data.roomId,
                        token: data.token,
                        statusID: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusID = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}

