require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    let info = await transporter.sendMail({
        from: `"Apocalypse"<mgapocalypse@gmail.com`,
        to: dataSend.reciverEmail,
        subject: "Thông tin thuê phòng ở",
        html: `
        <h3>Xin chào ${dataSend.studentName}!</h3>
        <p>Bạn nhận được email này vì đã thuê phòng ktx online trên PTIT-KTX</p>
        <p>Thông tin thuê phòng ktx:</p>
        <div><b>Thời hạn thuê: 1 năm</b></div>
        <div><b>Phòng: ${dataSend.roomName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thât, vui lòng click vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục thuê phòng ktx
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn</div>
        `
    });
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail
}