import employerService from "../services/employerService"; // Update the import statement

let getEmployerStudent = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await employerService.getEmployerStudent(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server...',
        });
    }
};

let getAllEmployers = async (req, res) => {
    try {
        let employers = await employerService.getAllEmployers();
        return res.status(200).json(employers);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let postInforEmployer = async (req, res) => {
    try {
        let response = await employerService.saveDetailInfoEmployer(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getDetailEmployerById = async (req, res) => {
    try {
        let infor = await employerService.getDetailEmployerById(req.query.id);
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
        let infor = await employerService.bulkCreateSchedule(req.body);
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
        let infor = await employerService.getScheduleByDate(req.query.employerId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
}


module.exports = {
    getEmployerStudent: getEmployerStudent,
    getAllEmployers: getAllEmployers,
    postInforEmployer: postInforEmployer,
    getDetailEmployerById: getDetailEmployerById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate
};
