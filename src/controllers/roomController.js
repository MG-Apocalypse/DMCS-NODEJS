import roomService from "../services/roomService"

let getRoomStudent = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await roomService.getRoomStudent(+limit);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllRooms = async (req, res) => {
    try {
        let rooms = await roomService.getAllRooms();
        return res.status(200).json(rooms)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postInforRoom = async (req, res) => {
    try {
        let response = await roomService.saveDetailInforRoom(req.body);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getRoomStudent: getRoomStudent,
    getAllRooms: getAllRooms,
    postInforRoom: postInforRoom,
}