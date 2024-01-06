import roomService from "../services/roomService"; // Update the import statement

let getRoomStudent = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await roomService.getRoomStudent(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getAllRooms = async (req, res) => {
    try {
        let rooms = await roomService.getAllRooms();
        return res.status(200).json(rooms);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let postInforRoom = async (req, res) => {
    try {
        let response = await roomService.saveDetailInfoRoom(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getDetailRoomById = async (req, res) => {
    try {
        let infor = await roomService.getDetailRoomById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await roomService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await roomService.getScheduleByDate(req.query.roomId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
}

let getExtraInforRoomById = async (req, res) => {
    try {
        let infor = await roomService.getExtraInforRoomById(req.query.roomId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getProfileRoomById = async (req, res) => {
    try {
        let infor = await roomService.getProfileRoomById(req.query.roomId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getListStudentForRoom = async (req, res) => {
    try {
        let infor = await roomService.getListStudentForRoom(req.query.roomId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    getRoomStudent: getRoomStudent,
    getAllRooms: getAllRooms,
    postInforRoom: postInforRoom,
    getDetailRoomById: getDetailRoomById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforRoomById: getExtraInforRoomById,
    getProfileRoomById: getProfileRoomById,
    getListStudentForRoom: getListStudentForRoom,
};
