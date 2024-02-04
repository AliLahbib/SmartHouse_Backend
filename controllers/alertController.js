const alertServices = require('../services/alertServices');

exports.addAlert = async (req, res, next) => {
    try {
        const alertData = req.body;
        console.log(alertData);
        const result = await alertServices.addAlert(alertData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}
