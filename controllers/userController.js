const userServices = require('../services/userServices');


exports.getUsers = async (req, res, next) => {
    try {
        const result = await userServices.getUsers();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const result = await userServices.addNewUser(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.editUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        const result = await userServices.editUser(id, userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await userServices.signIn(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

